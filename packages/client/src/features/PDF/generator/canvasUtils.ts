import _ from 'lodash'
import { LegendConfig, PdfGraphConfig } from 'types/pdf'
import { splitString } from 'utils/helpers'

interface Dimensions {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

interface Measurements {
  canvas: Dimensions
  graph: Dimensions
}

const DEFAULT_LEGEND_CONFIG: LegendConfig = {
  textWidth: 112,
  textMargin: 5,
  symbolSize: 8,
  symbolMargin: 5,
} as const

export const addGraphElements = (
  canvas: HTMLCanvasElement,
  keys: string[],
  colors: string[],
  config: PdfGraphConfig
) => {
  const legendConfig = config.legendConfig ?? DEFAULT_LEGEND_CONFIG
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const d = getCanvasMeasurements(canvas, config)
    const { textWidth, textMargin, symbolSize, symbolMargin } = legendConfig

    const legendItemWidth = textWidth + symbolSize + symbolMargin
    const keyGroups = _.chunk(keys, Math.ceil(5 / config.groupSize))
    let colorIndex = 0
    keyGroups.forEach((group, groupIndex) => {
      const groupTotalWidth = group.length * (legendItemWidth + textMargin)
      const groupMarginX = Math.max((d.canvas.width - groupTotalWidth) / 2, 5)
      const groupX = d.canvas.left + groupMarginX
      const groupY = d.graph.bottom + 30 + groupIndex * 25

      group.forEach((name, index) => {
        const itemX = groupX + index * (legendItemWidth + textMargin)
        const itemY = groupY

        ctx.fillStyle = colors[colorIndex]
        colorIndex += 1
        ctx.fillRect(itemX, itemY, symbolSize, symbolSize)

        const text = splitString(name, 21)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        const textX = itemX + symbolSize + symbolMargin
        const textMarginY = Math.max(15 / 2 - text.length * 2.5, 0)
        let textY = itemY + textMarginY
        ctx.fillStyle = '#0a0a0a'
        text.forEach(line => {
          ctx.fillText(line, textX, textY)
          textY += 10
        })
      })
    })

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = 'white'
    ctx.fillRect(d.canvas.left, d.canvas.top, d.canvas.width, d.canvas.height)
  }
}

const getCanvasMeasurements = (canvas: HTMLCanvasElement, config: PdfGraphConfig): Measurements => {
  const { margin } = config
  const [canvasWidth, canvasHeight] = [canvas.width / 2, canvas.height / 2]

  return {
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
      top: -margin.top,
      right: canvasWidth - margin.left,
      bottom: canvasHeight - margin.top,
      left: -margin.left,
    },
    graph: {
      width: canvasWidth - margin.left - margin.right,
      height: canvasHeight - margin.top - margin.bottom,
      top: 0,
      right: canvasWidth - margin.left - margin.right,
      bottom: canvasHeight - margin.top - margin.bottom,
      left: 0,
    },
  }
}
