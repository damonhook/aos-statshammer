import { Color } from 'jspdf-autotable'
import { PdfGraphConfig, PdfGraphConfigs, PdfStyles } from 'types/pdf'

export const TABLE_HEAD_COLOR: Color = [51, 171, 159]

export const STYLES: PdfStyles = {
  text: {
    fontSize: 10,
    fontStyle: 'normal',
  },
  header: {
    fontSize: 16,
    fontStyle: 'normal',
  },
  subheader: {
    fontSize: 14,
    fontStyle: 'normal',
  },
} as const

export const LAYOUT = {
  lineHeight: 1.2,
  marginY: 20,
  marginX: 10,
} as const

export const PDF_GRAPHS = {
  comparison: {
    id: 'pdf-comparison',
    margin: { top: 30, right: 30, bottom: 60, left: 60 },
    groupSize: 1,
  },
  cumulative: {
    id: 'pdf-cumulative',
    margin: { top: 40, right: 20, bottom: 100, left: 40 },
    groupSize: 2,
  },
  discrete: {
    id: 'pdf-discrete',
    margin: { top: 40, right: 20, bottom: 100, left: 40 },
    groupSize: 2,
  },
}

export const graphIds = {
  comparisonBar: 'pdf-comparison-bar',
  comparisonGraphs: 'pdf-comparison-graphs',
  cumulativeGraphs: 'pdf-cumulative-graphs',
  discreteGraphs: 'pdf-discrete-graphs',
} as const
