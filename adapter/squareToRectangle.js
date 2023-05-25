class Square {
  constructor(side) {
    this.side = side;
  }
}

function area(rectangle) {
  return rectangle._width * rectangle._height;
}

class Rectangle {
  constructor({ width, height }) {
    this._width = width;
    this._height = height;
  }
}

class SquareToRectangleAdapter {
  constructor(square) {
    return new Rectangle({ width: square.side, height: square.side });
  }
}

class SquareToRectAdapter {
  constructor(square) {
    this.square = square;
  }

  get _width() {
    return this.square.side;
  }

  get _height() {
    return this.square.side;
  }
}
