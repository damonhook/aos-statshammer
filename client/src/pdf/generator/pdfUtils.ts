import nanoid from 'nanoid';
import html2canvas from 'html2canvas';
import { IJsPDF } from 'types/pdf';
import cursor from './cursor';

export const margin = 20;
export const headerColor: [number, number, number] = [51, 171, 159];

export const addHR = (doc: IJsPDF) => {
  doc.line(margin, cursor.pos, doc.internal.pageSize.getWidth() - margin * 2, cursor.pos);
  cursor.incr(doc.internal.getLineHeight());
};

export const addHeader = (doc: IJsPDF, text: string) => {
  doc.setFontSize(18);
  doc.text(text, doc.internal.pageSize.getWidth() / 2, cursor.pos, { align: 'center' });
  cursor.incr(20);
  addHR(doc);
  doc.setFontSize(12);
};

export const addSubHeader = (doc: IJsPDF, text: string) => {
  doc.setFontSize(14);
  doc.text(text, doc.internal.pageSize.getWidth() / 2, cursor.pos, { align: 'center' });
  doc.setFontSize(12);
  cursor.incr(10);
};

export const addPage = (doc: IJsPDF) => {
  doc.addPage();
  cursor.reset();
};

export const addImage = async (doc: IJsPDF, element: HTMLElement) => {
  const canvas = await html2canvas(element);
  const pageWidth = doc.internal.pageSize.getWidth();
  const imgData = canvas.toDataURL('image/JPEG', 0.75);
  const imgProps = doc.getImageProperties(imgData);
  const imgWidth = pageWidth - margin * 2;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  doc.addImage(imgData, 'JPEG', margin, cursor.pos, imgWidth, imgHeight, nanoid());
  cursor.incr(imgHeight + 20);
};

export const addGraphs = async (doc: IJsPDF, classname: string) => {
  const elements = document.getElementsByClassName(classname);
  for (let i = 0; i < elements.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await addImage(doc, elements[i] as HTMLElement);
  }
};
