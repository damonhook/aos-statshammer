/* eslint-disable no-underscore-dangle */
class Cursor {
  constructor(margin = 0) {
    this._pos = margin;
    this._margin = margin;
  }

  get pos() {
    return this._pos;
  }

  set pos(newPos) {
    this._pos = newPos;
  }

  incr(amt) {
    this._pos += amt;
  }

  reset() {
    this._pos = this._margin;
  }
}

export default Cursor;
