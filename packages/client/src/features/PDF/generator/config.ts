import { Color } from 'jspdf-autotable'

export interface PdfStyle {
  fontSize: number
  fontStyle: 'bold' | 'italic' | 'normal'
}
export type PdfStyles = { [name: string]: PdfStyle }

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
