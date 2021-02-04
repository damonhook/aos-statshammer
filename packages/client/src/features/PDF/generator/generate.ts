import { RowInput } from 'jspdf-autotable'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { ComparisonResult } from 'types/store/comparison'
import { SimulationResult } from 'types/store/simulations'
import { Target } from 'types/store/target'
import type { NameMapping, Unit } from 'types/store/units'
import { getModifierData, getModifierDescription } from 'utils/modifiers'

import { graphIds, LAYOUT } from './config'
import PdfDoc from './pdfDoc'

export interface GenerateProps {
  units: Unit[]
  target: Target
  modifierDefinitions: ModifierDefinition[]
  targetModifierDefinitions: ModifierDefinition[]
  nameMapping: NameMapping
  comparisonResults: ComparisonResult[]
  simulationResults: SimulationResult[]
}

const generate = async ({
  units,
  target,
  modifierDefinitions,
  targetModifierDefinitions,
  nameMapping,
  comparisonResults,
  simulationResults,
}: GenerateProps) => {
  const pdf = new PdfDoc()
  pdf.doc.setProperties({ title: 'Aos Statshammer Report' }).setLineHeightFactor(LAYOUT.lineHeight)
  pdf.writeHeader('Aos Statshammer Report')
  await addUnits(pdf, units, modifierDefinitions)
  if (target && target.modifiers.length) await addTarget(pdf, target, targetModifierDefinitions)
  pdf.writeText('Results on next page', pdf.doc.internal.pageSize.getWidth() - LAYOUT.marginX, pdf.cursor, {
    style: { fontStyle: 'italic' },
    align: 'right',
  })
  pdf.addPage()
  await addComparisonResults(pdf, comparisonResults, nameMapping)
  pdf.addPage()
  await addSimulationResults(pdf, simulationResults, nameMapping)
  return pdf.doc
}

const addUnits = async (pdf: PdfDoc, units: Unit[], modifierDefinitions: ModifierDefinition[]) => {
  pdf.writeSubHeader('Units')
  for (const unit of units) {
    await addUnit(pdf, unit, modifierDefinitions)
    pdf.cursor += pdf.getLineHeight(5)
  }
  pdf.drawHR()
}

const addUnit = async (pdf: PdfDoc, unit: Unit, modifierDefinitions: ModifierDefinition[]) => {
  const unitHeader: RowInput = [
    {
      content: unit.name,
      colSpan: 6,
      styles: {
        halign: 'center',
        fontStyle: 'bold',
        fillColor: false,
        textColor: 20,
        fontSize: 12,
      },
    },
  ]
  unit.weaponProfiles.forEach((profile, index) => {
    const { name, numModels, attacks, toHit, toWound, rend, damage, modifiers } = profile
    const head: RowInput[] = []
    const body: RowInput[] = []

    if (index === 0) head.push(unitHeader)
    head.push(
      [{ content: name ?? 'Weapon Profile', colSpan: 6, styles: { halign: 'center' } }],
      ['# Models', 'Attacks', 'To Hit', 'To Wound', 'Rend', 'Damage']
    )

    body.push(
      [numModels, attacks, `${toHit}+`, `${toWound}+`, rend ? `-${rend}` : '-', damage],
      ...getModifierRows(modifiers, modifierDefinitions, 6)
    )

    const cellWidth = Math.floor((pdf.doc.internal.pageSize.getWidth() - LAYOUT.marginX * 2) / 6)
    pdf.addTable({
      head,
      body,
      columnStyles: {
        0: { cellWidth: cellWidth },
        1: { cellWidth: cellWidth },
        2: { cellWidth: cellWidth },
        3: { cellWidth: cellWidth },
        4: { cellWidth: cellWidth },
        5: { cellWidth: cellWidth },
      },
    })
    pdf.cursor += pdf.getLineHeight(2)
  })
}

const addTarget = async (pdf: PdfDoc, target: Target, targetModifierDefinitions: ModifierDefinition[]) => {
  pdf.writeSubHeader('Target')
  const head: RowInput[] = [[{ content: 'Target', styles: { halign: 'center' } }]]
  const body = getModifierRows(target.modifiers, targetModifierDefinitions, 1)
  pdf.addTable({ head, body })
  pdf.cursor += pdf.getLineHeight(5)
  pdf.drawHR()
}

const addComparisonResults = async (pdf: PdfDoc, results: ComparisonResult[], nameMapping: NameMapping) => {
  pdf.writeSubHeader('Comparison')
  const head: RowInput[] = [
    [{ content: 'Average Damage', colSpan: 7, styles: { halign: 'center' } }],
    ['Unit Name', ...results.map(({ displaySave }) => displaySave)],
  ]
  const body: RowInput[] = Object.entries(nameMapping).map(([id, name]) => [
    name,
    ...results.map(({ values }) => (values[id] ?? 0).toFixed(2)),
  ])
  pdf.addTable({ head, body })
  pdf.cursor += pdf.getLineHeight(5)
  await pdf.addImageFromId(graphIds.comparisonGraphs)
}

const addSimulationResults = async (pdf: PdfDoc, results: SimulationResult[], nameMapping: NameMapping) => {
  pdf.writeSubHeader('Cumulative Probability')
  await pdf.addImageFromId(graphIds.cumulativeGraphs)
  pdf.addPage()
  pdf.writeSubHeader('Discrete Probability')
  await pdf.addImageFromId(graphIds.discreteGraphs)
}

const getModifierRows = (
  modifiers: Modifier[],
  definitions: ModifierDefinition[],
  colSpan: number
): RowInput[] => {
  const modifierData = getModifierData(modifiers, definitions)
  const items: RowInput[] = []
  if (modifierData.length) {
    items.push([
      {
        content: 'Modifiers',
        colSpan: colSpan,
        styles: { halign: 'center', fontStyle: 'bold', fillColor: [240, 240, 240] },
      },
    ])
    items.push(
      ...modifierData.map(({ modifier, definition }) => [
        {
          content: `${definition.name}:\n\t${getModifierDescription(modifier, definition, true)}`,
          colSpan: colSpan,
        },
      ])
    )
  }
  return items
}

export default generate
