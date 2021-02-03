import jsPDF, { TextOptionsLight } from 'jspdf'

import { LAYOUT, PdfStyle, STYLES } from './config'
import type Cursor from './cursor'

interface TextOptions extends TextOptionsLight {
  style?: Partial<PdfStyle>
}

class DocUtils {
  private doc: jsPDF
  private cursor: Cursor

  constructor(doc: jsPDF, cursor: Cursor) {
    this.doc = doc
    this.cursor = cursor
  }

  getStyle(doc: jsPDF): PdfStyle {
    const docStyle = this.doc.getFont().fontStyle
    const fontStyle = docStyle === 'italic' || docStyle === 'bold' ? docStyle : 'normal'
    return {
      fontSize: doc.getFontSize(),
      fontStyle,
    }
  }

  setStyle(style: Partial<PdfStyle>) {
    if (style.fontSize) this.doc.setFontSize(style.fontSize)
    if (style.fontStyle) {
      const font = this.doc.getFont()
      this.doc.setFont(font.fontName, style.fontStyle)
    }
  }

  withStyle(style: Partial<PdfStyle>, inner: () => void) {
    const origStyle = this.getStyle(this.doc)
    this.setStyle(style)
    inner()
    this.setStyle(origStyle)
  }

  addText(text: string | string[], x: number = LAYOUT.marginX, y = this.cursor.pos, options?: TextOptions) {
    const { style, ...rest } = options ?? {}
    const textStyle = { ...STYLES.text, ...(style ?? {}) }
    this.withStyle(textStyle, () => {
      this.doc.text(text, x, y, rest)
      // @ts-ignore: getTextDimensions actually can accept string[]
      this.cursor.incr(this.doc.getTextDimensions(text).h)
    })
  }

  addHeader(text: string) {
    this.withStyle(STYLES.header, () => {
      this.doc.text(text, this.doc.internal.pageSize.getWidth() / 2, this.cursor.pos, { align: 'center' })
      this.cursor.incr(this.doc.getTextDimensions(text).h)
      this.addHR()
    })
  }

  addSubHeader(text: string) {
    this.withStyle(STYLES.subheader, () => {
      this.doc.text(text, this.doc.internal.pageSize.getWidth() / 2, this.cursor.pos, { align: 'center' })
      this.cursor.incr(this.doc.getTextDimensions(text).h)
    })
  }

  addHR() {
    const fontSize = this.doc.getFontSize()
    this.doc.line(
      LAYOUT.marginX,
      this.cursor.pos,
      this.doc.internal.pageSize.getWidth() - LAYOUT.marginX,
      this.cursor.pos
    )
    this.cursor.incr((fontSize * LAYOUT.lineHeight) / 2)
  }

  addPage() {
    this.doc.addPage()
    this.cursor.reset()
  }
}

export default DocUtils
