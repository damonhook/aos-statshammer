import html2canvas from 'html2canvas'
import jsPDF, { jsPDFOptions, TextOptionsLight } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'
import { nanoid } from 'nanoid'

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

  addImageFromId = async (id: string) => {
    const element = document.getElementById(id)
    if (element) await this.addImageFromHTML(element)
  }

  addImageFromHTML = async (element: HTMLElement) => {
    const pageWidth = this.doc.internal.pageSize.getWidth()
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/jpeg', 0.5)
    const imgProps = this.doc.getImageProperties(imgData)
    const imgWidth = pageWidth - LAYOUT.marginX * 2
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width
    this.doc.addImage(imgData, 'JPEG', LAYOUT.marginX, this.cursor, imgWidth, imgHeight, nanoid())
    this.cursor += imgHeight
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
