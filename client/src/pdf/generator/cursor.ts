class Cursor {
  _pos: number;
  _margin: number;

  constructor(margin = 0) {
    this._pos = margin;
    this._margin = margin;
  }

  get pos() {
    return this._pos;
  }

  set pos(newPos: number) {
    this._pos = newPos;
  }

  incr(amt: number) {
    this._pos += amt;
  }

  reset() {
    this._pos = this._margin;
  }
}

const cursor = new Cursor(20);

export { Cursor, cursor as default };
