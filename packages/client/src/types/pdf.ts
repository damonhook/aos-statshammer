import type { Margin } from '@nivo/core'

export interface PdfStyle {
  fontSize: number
  fontStyle: 'bold' | 'italic' | 'normal'
}
export type PdfStyles = { [name: string]: PdfStyle }

export interface LegendConfig {
  textWidth: number
  textMargin: number
  symbolSize: number
  symbolMargin: number
}

export interface PdfGraphConfig {
  id: string
  margin: Margin
  groupSize: number
  legendConfig?: LegendConfig
}

export type PdfGraphConfigs = { [g: string]: PdfGraphConfig }
