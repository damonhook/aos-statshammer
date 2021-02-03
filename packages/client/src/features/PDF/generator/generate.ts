import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import type { Unit } from 'types/store/units'
import { getModifierData, getModifierDescription } from 'utils/modifiers'

import { LAYOUT, TABLE_HEAD_COLOR } from './config'
import Cursor from './cursor'
import DocUtils from './utils'

export interface GenerateProps {
  units: Unit[]
  modifierDefinitions: ModifierDefinition[]
}

const getModifierItems = (modifiers: Modifier[], definitions: ModifierDefinition[]): RowInput[] => {
  const modifierData = getModifierData(modifiers, definitions)
  const items: RowInput[] = []
  if (modifierData.length) {
    items.push([
      {
        content: 'Modifiers',
        colSpan: 6,
        styles: { halign: 'center', fontStyle: 'bold', fillColor: [240, 240, 240] },
      },
    ])
    items.push(
      ...modifierData.map(({ modifier, definition }) => [
        {
          content: `${definition.name}:\n\t${getModifierDescription(modifier, definition, true)}`,
          colSpan: 6,
        },
      ])
    )
  }
  return items
}

const generateUnit = (
  doc: jsPDF,
  cursor: Cursor,
  docUtils: DocUtils,
  unit: Unit,
  modifierDefinitions: ModifierDefinition[]
) => {
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
      ...getModifierItems(modifiers, modifierDefinitions)
    )

    const cellWidth = Math.floor((doc.internal.pageSize.getWidth() - LAYOUT.marginX * 2) / 6)
    autoTable(doc, {
      startY: cursor.pos,
      head: head,
      body: body,
      headStyles: { fillColor: TABLE_HEAD_COLOR },
      columnStyles: {
        0: { cellWidth: cellWidth },
        1: { cellWidth: cellWidth },
        2: { cellWidth: cellWidth },
        3: { cellWidth: cellWidth },
        4: { cellWidth: cellWidth },
        5: { cellWidth: cellWidth },
      },
      pageBreak: 'avoid',
      theme: 'grid',
    })
    cursor.pos = (doc as any).lastAutoTable.finalY
    cursor.incr(2 * doc.getLineHeightFactor())
  })
}

const generate = async (props: GenerateProps) => {
  const { units, modifierDefinitions } = props
  const doc = new jsPDF()
  const cursor = new Cursor(LAYOUT.marginY)
  const docUtils = new DocUtils(doc, cursor)
  doc.setProperties({ title: 'Aos Statshammer Report' }).setLineHeightFactor(LAYOUT.lineHeight)
  docUtils.addHeader('Aos Statshammer Report')
  docUtils.addSubHeader('Units')
  units.forEach(unit => {
    generateUnit(doc, cursor, docUtils, unit, modifierDefinitions)
    cursor.incr(5 * doc.getLineHeightFactor())
  })
  docUtils.addText('Results on next page', doc.internal.pageSize.getWidth() - LAYOUT.marginX, cursor.pos, {
    style: { fontStyle: 'italic' },
    align: 'right',
  })
  docUtils.addPage()
  docUtils.addSubHeader('Comparison')
  return doc
}

export default generate
