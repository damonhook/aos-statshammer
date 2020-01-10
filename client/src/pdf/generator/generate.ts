/* eslint-disable no-underscore-dangle */
import jsPDF from 'jspdf';
// eslint-disable-next-line import/no-duplicates
import 'jspdf-autotable'; // Has to be separate import
// eslint-disable-next-line import/no-duplicates
import { MultipleRowType } from 'jspdf-autotable';
import { getModifierById } from 'store/selectors/modifierHelpers';
import { getTargetModifierById } from 'store/selectors/targetModifierHelpers';
import { getFormattedDescription } from 'components/ModifierItem/ModifierDescription';
import { IUnitStore, ITargetStore } from 'types/store';
import { TResult } from 'types/stats';
import { IJsPDF } from 'types/pdf';
import { IModifierInstance } from 'types/modifiers';
import cursor from './cursor';
import { margin, headerColor, addHeader, addSubHeader, addHR, addPage, addGraphs } from './pdfUtils';

const getModifierItems = (modifiers: IModifierInstance[], isTarget = false): MultipleRowType => {
  const modifierItems = modifiers
    .map(({ id, options }) => {
      const definition = isTarget ? getTargetModifierById(id) : getModifierById(id);
      if (definition) {
        const content = `${definition.name}:\n\t${getFormattedDescription(definition, options, false)}`;
        return [{ content, colSpan: 6 }];
      }
      return null;
    })
    .filter(item => item);
  if (modifierItems) {
    return [
      [
        {
          content: 'Modifiers',
          colSpan: 6,
          styles: { halign: 'center', fontStyle: 'bold', fillColor: [240, 240, 240] },
        },
      ],
      ...modifierItems,
    ] as MultipleRowType;
  }
  return [];
};

const generateUnits = (doc: IJsPDF, units: IUnitStore) => {
  addSubHeader(doc, 'Units');
  units.forEach(({ name, weapon_profiles }) => {
    weapon_profiles.forEach((profile, index) => {
      const profileName = profile.name || 'Weapon Profile';
      const { num_models, attacks, to_hit, to_wound, rend, damage } = profile;
      let body = [[num_models, attacks, `${to_hit}+`, `${to_wound}+`, rend, damage]];

      if (profile.modifiers && profile.modifiers.length) {
        const modifierItems = getModifierItems(profile.modifiers);
        body = [...body, ...modifierItems] as (string | number)[][];
      }

      let head: MultipleRowType = [
        [{ content: profileName, colSpan: 6, styles: { halign: 'center' } }],
        ['# Models', 'Attacks', 'To Hit', 'To Wound', 'Rend', 'Damage'],
      ];
      if (index === 0) {
        const headStyle = {
          halign: 'center',
          fontStyle: 'bold',
          fillColor: null,
          textColor: 20,
          fontSize: 12,
        };
        head = [[{ content: name, colSpan: 6, styles: headStyle }], ...head] as MultipleRowType;
      }

      doc.autoTable({
        startY: cursor.pos,
        head,
        body,
        headStyles: { fillColor: headerColor },
        columnStyles: {
          0: { cellWidth: 85 },
          1: { cellWidth: 85 },
          2: { cellWidth: 85 },
          3: { cellWidth: 85 },
          4: { cellWidth: 85 },
          5: { cellWidth: 85 },
        },
        pageBreak: 'avoid',
        theme: 'grid',
      });
      cursor.pos = doc.previousAutoTable.finalY;
      cursor.incr(doc.internal.getLineHeight() - 5);
    });
    cursor.incr(20);
  });
  addHR(doc);
  cursor.incr(10);
};

const generateTarget = (doc: IJsPDF, target: ITargetStore) => {
  addSubHeader(doc, 'Target');
  const head: MultipleRowType = [[{ content: 'Target', colSpan: 6, styles: { halign: 'center' } }]];
  const body = [...getModifierItems(target.modifiers, true)] as MultipleRowType;
  doc.autoTable({
    startY: cursor.pos,
    head,
    body,
    headStyles: { fillColor: headerColor },
    columnStyles: {
      0: { cellWidth: 85 },
      1: { cellWidth: 85 },
      2: { cellWidth: 85 },
      3: { cellWidth: 85 },
      4: { cellWidth: 85 },
      5: { cellWidth: 85 },
    },
    pageBreak: 'avoid',
    theme: 'grid',
  });
  cursor.pos = doc.previousAutoTable.finalY;
  cursor.incr(doc.internal.getLineHeight() - 5);
  cursor.incr(20);
  addHR(doc);
  cursor.incr(10);
};

const transposeData = (unitNames: string[], results: TResult[]) =>
  unitNames.map(name =>
    results.reduce((acc, { save, ...results }) => ({ ...acc, [save]: results[name] }), { name }),
  );

const generateStatsTable = (doc: IJsPDF, results: TResult[], unitNames: string[]) => {
  const data = transposeData(unitNames, results);
  const transformRow = ({ name, ...results }) => [name, ...Object.keys(results).map(k => results[k])];

  doc.autoTable({
    startY: cursor.pos,
    head: [
      [{ content: 'Average Damage', colSpan: 7, styles: { halign: 'center' } }],
      ['Unit Name', ...results.map(({ save }) => (save !== 'None' ? `${save}+` : '-'))],
    ],
    body: data.map(row => transformRow(row)),
    headStyles: { fillColor: headerColor },
    columnStyles: {
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 },
      4: { cellWidth: 40 },
      5: { cellWidth: 40 },
      6: { cellWidth: 40 },
    },
    pageBreak: 'avoid',
    theme: 'grid',
  });
  cursor.pos = doc.previousAutoTable.finalY;
  cursor.incr(20);
};

const generate = async (
  units: IUnitStore,
  target: ITargetStore,
  results: TResult[],
  unitNames: string[],
  statsClassName: string,
  cumulativeClassName: string,
  probabilitiesClassName: string,
) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF('p', 'pt', 'a4') as IJsPDF;
  doc.setProperties({
    title: 'AoS Statshammer Report',
  });
  cursor.reset();
  cursor.incr(20);
  addHeader(doc, 'AoS Statshammer Report');
  generateUnits(doc, units);
  if (target && target.modifiers && target.modifiers.length) {
    generateTarget(doc, target);
  }
  doc.setFontSize(9);
  doc.setFontType('italic');
  doc.text('Turn to next page for results', doc.internal.pageSize.getWidth() - margin * 2, cursor.pos, {
    align: 'right',
  });
  doc.setFontType('normal');
  doc.setFontSize(12);

  addPage(doc);
  cursor.incr(20);
  addSubHeader(doc, 'Results');

  generateStatsTable(doc, results, unitNames);

  await addGraphs(doc, statsClassName);
  addPage(doc);
  cursor.incr(20);
  doc.setFontSize(14);
  addSubHeader(doc, 'Cumulative Probabilities');
  cursor.incr(10);
  await addGraphs(doc, cumulativeClassName);
  addPage(doc);
  cursor.incr(20);
  addSubHeader(doc, 'Probabilities');
  cursor.incr(10);
  await addGraphs(doc, probabilitiesClassName);
  return doc;
};

export default generate;
