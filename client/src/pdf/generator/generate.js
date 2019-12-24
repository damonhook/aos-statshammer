/* eslint-disable no-underscore-dangle */
import jsPDF from 'jspdf';
import nanoid from 'nanoid';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { getModifierById } from 'utils/modifierHelpers';
import { getFormattedDescription } from 'components/ModifierItem/ModifierDescription';
import Cursor from './cursor';

const margin = 20;
const cursor = new Cursor(margin);
const headerColor = [51, 171, 159];

const getModifierItems = (modifiers) => {
  const modifierItems = modifiers.map(({ id, options }) => {
    const definition = getModifierById(id);
    if (definition) {
      const content = (
        `${definition.name}:\n\t${getFormattedDescription(definition, options, false)}`
      );
      return [{ content, colSpan: 6 }];
    }
    return null;
  }).filter((item) => item);
  if (modifierItems) {
    return [
      [{
        content: 'Modifiers',
        colSpan: 6,
        styles: { halign: 'center', fontStyle: 'bold', fillColor: [240, 240, 240] },
      }],
      ...modifierItems,
    ];
  }
  return [];
};

const generateUnits = (doc, units) => {
  units.forEach(({ name, weapon_profiles }) => {
    weapon_profiles.forEach((profile, index) => {
      const profileName = profile.name || 'Weapon Profile';
      const {
        num_models, attacks, to_hit, to_wound, rend, damage,
      } = profile;
      let body = [[num_models, attacks, `${to_hit}+`, `${to_wound}+`, rend, damage]];

      if (profile.modifiers && profile.modifiers.length) {
        const modifierItems = getModifierItems(profile.modifiers);
        body = [...body, ...modifierItems];
      }

      let head = [
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
        head = [[{ content: name, colSpan: 6, styles: headStyle }], ...head];
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
    cursor.incr(25);
  });
};

const transposeData = (unitNames, results) => unitNames.reduce((acc, name) => {
  const item = { name };
  results.forEach(({ save, ...results }) => {
    item[save] = results[name];
  });
  acc.push(item);
  return acc;
}, []);

const generateStatsTable = (doc, results, unitNames) => {
  const data = transposeData(unitNames, results);
  const transformRow = ({ name, ...results }) => [
    name,
    ...Object.keys(results).map((k) => (
      results[k]
    )),
  ];

  doc.autoTable({
    startY: cursor.pos,
    head: [
      [{ content: 'Average Damage', colSpan: 7, styles: { halign: 'center' } }],
      ['Unit Name', ...results.map(({ save }) => (save !== 'None' ? `${save}+` : '-'))],
    ],
    body: data.map((row) => (
      transformRow(row)
    )),
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

const addImage = async (doc, element) => {
  const canvas = await html2canvas(element);
  const pageWidth = doc.internal.pageSize.getWidth();
  const imgData = canvas.toDataURL('image/JPEG', 0.75);
  const imgProps = doc.getImageProperties(imgData);
  const imgWidth = pageWidth - (margin * 2);
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  doc.addImage(imgData, 'JPEG', margin, cursor.pos, imgWidth, imgHeight, nanoid(), 'MEDIUM');
  cursor.incr(imgHeight + 20);
};

const addGraphs = async (doc, classname) => {
  const elements = document.getElementsByClassName(classname);
  for (let i = 0; i < elements.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await addImage(doc, elements[i]);
  }
};

const generate = async (
  units, results, modifiers, unitNames, statsClassName, probabilitiesClassName,
) => {
  window.html2canvas = html2canvas;
  // eslint-disable-next-line new-cap
  const doc = new jsPDF('p', 'pt', 'a4');
  doc.setProperties({
    title: 'AoS Statshammer Report',
  });
  cursor.reset();
  cursor.incr(20);
  doc.setFontSize(18);
  doc.text('AoS Statshammer Report', doc.internal.pageSize.getWidth() / 2, cursor.pos, { align: 'center' });
  cursor.incr(20);
  doc.line(margin, cursor.pos, doc.internal.pageSize.getWidth() - (margin * 2), cursor.pos);
  cursor.incr(doc.internal.getLineHeight());
  doc.setFontSize(12);
  generateUnits(doc, units);
  doc.setFontSize(9);
  doc.setFontType('italic');
  doc.text(
    'Turn to next page for results',
    doc.internal.pageSize.getWidth() - (margin * 2),
    cursor.pos,
    { align: 'right' },
  );
  doc.setFontType('normal');
  doc.setFontSize(12);

  doc.setFontSize(14);
  doc.addPage();
  cursor.reset();
  cursor.incr(20);
  doc.text('Results', doc.internal.pageSize.getWidth() / 2, cursor.pos, { align: 'center' });
  doc.setFontSize(12);
  cursor.incr(10);

  generateStatsTable(doc, results, unitNames);

  await addGraphs(doc, statsClassName);
  doc.addPage();
  cursor.reset();
  cursor.incr(20);
  doc.text('Probabilities', doc.internal.pageSize.getWidth() / 2, cursor.pos, { align: 'center' });
  cursor.incr(10);
  await addGraphs(doc, probabilitiesClassName);
  return doc;
};

export default generate;
