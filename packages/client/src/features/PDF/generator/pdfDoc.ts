import html2canvas from 'html2canvas'
import jsPDF, { jsPDFOptions, TextOptionsLight } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { lightTheme } from 'themes'
import { PdfGraphConfig } from 'types/pdf'
import { NameMapping } from 'types/store/units'

import { addGraphElements } from './canvasUtils'
import { LAYOUT, PdfStyle, STYLES, TABLE_HEAD_COLOR } from './config'

interface TextOptions extends TextOptionsLight {
  style?: Partial<PdfStyle>
}

class PdfDoc {
  doc: jsPDF
  cursor: number

  constructor(options?: jsPDFOptions) {
    this.doc = new jsPDF(options)
    this.cursor = LAYOUT.marginY
  }

  withStyle(style: Partial<PdfStyle>, inner: () => void) {
    const origStyle = this.getStyle()
    this.setStyle(style)
    inner()
    this.setStyle(origStyle)
  }

  writeText(text: string | string[], x: number = LAYOUT.marginX, y = this.cursor, options?: TextOptions) {
    const { style, ...rest } = options ?? {}
    const textStyle = { ...STYLES.text, ...(style ?? {}) }
    this.withStyle(textStyle, () => {
      this.doc.text(text, x, y, rest)
      // getTextDimensions actually can accept string[] but the typings are wrong
      this.cursor += this.doc.getTextDimensions(text as string).h
    })
    return this
  }

  public writeHeader(text: string) {
    this.writeText(text, this.doc.internal.pageSize.getWidth() / 2, this.cursor, {
      align: 'center',
      style: STYLES.header,
    })
    this.drawHR()
    this.cursor += this.getLineHeight(4)
    return this
  }

  writeSubHeader(text: string) {
    this.withStyle(STYLES.subheader, () => {
      this.doc.text(text, this.doc.internal.pageSize.getWidth() / 2, this.cursor, { align: 'center' })
      this.cursor += this.doc.getTextDimensions(text).h
    })
    return this
  }

  drawHR() {
    this.doc.line(
      LAYOUT.marginX,
      this.cursor,
      this.doc.internal.pageSize.getWidth() - LAYOUT.marginX,
      this.cursor
    )
    this.cursor += this.getLineHeight(5)
    return this
  }

  addTable(options: UserOptions) {
    autoTable(this.doc, {
      startY: this.cursor,
      headStyles: { fillColor: TABLE_HEAD_COLOR },
      pageBreak: 'avoid',
      theme: 'grid',
      ...options,
    })
    this.cursor = (this.doc as any).lastAutoTable.finalY
  }

  addCanvasGraph = (config: PdfGraphConfig, nameMapping: NameMapping) => {
    console.log(config)
    const colors = lightTheme.palette.graphs.series
    const canvasList = Array.from(document.getElementById(config.id)?.getElementsByTagName('canvas') ?? [])
    const canvasGroups = _.chunk(canvasList, config.groupSize)
    console.log(canvasGroups)
    canvasGroups.forEach(cGroup => {
      let groupHeight = 0
      let imgX = LAYOUT.marginX
      cGroup.forEach(canvas => {
        const pageWidth = this.doc.internal.pageSize.getWidth() - LAYOUT.marginX * 2
        try {
          addGraphElements(canvas, Object.values(nameMapping), colors, config)
          const imgData = canvas.toDataURL('image/jpeg', 0.5)
          const imgProps = this.doc.getImageProperties(imgData)
          const imgWidth = pageWidth / config.groupSize
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width
          this.doc.addImage(imgData, 'JPEG', imgX, this.cursor, imgWidth, imgHeight, nanoid())
          imgX += imgWidth
          groupHeight = Math.max(groupHeight, imgHeight)
        } catch (err) {
          console.error(err)
        }
      })
      this.cursor += groupHeight
    })
  }

  addPage(format?: string | number[], orientation?: 'p' | 'portrait' | 'l' | 'landscape') {
    this.doc.addPage(format, orientation)
    this.resetCursor()
    return this
  }

  resetCursor() {
    this.cursor = LAYOUT.marginY
  }

  getLineHeight(numLines: number) {
    return numLines * LAYOUT.lineHeight
  }

  private getStyle(): PdfStyle {
    const docStyle = this.doc.getFont().fontStyle
    const fontStyle = docStyle === 'italic' || docStyle === 'bold' ? docStyle : 'normal'
    return {
      fontSize: this.doc.getFontSize(),
      fontStyle,
    }
  }

  private setStyle(style: Partial<PdfStyle>) {
    if (style.fontSize) this.doc.setFontSize(style.fontSize)
    if (style.fontStyle) {
      const font = this.doc.getFont()
      this.doc.setFont(font.fontName, style.fontStyle)
    }
  }
}

export default PdfDoc
