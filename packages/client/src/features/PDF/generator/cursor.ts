import { LAYOUT } from './config'

class Cursor {
  private cPos: number
  private cMargin: number

  constructor(margin = LAYOUT.marginY) {
    this.cPos = margin
    this.cMargin = margin
  }

  get pos() {
    return this.cPos
  }

  set pos(newPos: number) {
    this.cPos = newPos
  }

  get margin() {
    return this.cMargin
  }

  incr(amt: number) {
    this.cPos += amt
  }

  reset() {
    this.cPos = this.cMargin
  }
}

export default Cursor
