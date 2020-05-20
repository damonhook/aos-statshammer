import type jsPDF from 'jspdf';
import type { autoTable } from 'jspdf-autotable';

interface IAutoTableResult {
  finalY: number;
}

export interface IJsPDF extends jsPDF {
  getImageProperties: (image: string) => { width: number; height: number };
  autoTable: autoTable;
  previousAutoTable: IAutoTableResult;
}
