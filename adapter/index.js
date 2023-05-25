String.prototype.hashCode = function () {
  return this.split('').reduce((acc, char) => {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y}`;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.start.toString()} -> ${this.end.toString()}`;
  }
}

class VectorObject extends Array {}

class VectorRectangle extends VectorObject {
  constructor(x, y, width, height) {
    super();

    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    this.push(
      new Line(new Point(x + width, y), new Point(x + width, y + height))
    );
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    this.push(
      new Line(new Point(x, y + height), new Point(x + width, y + height))
    );
  }
}

class LineToPointAdapter {
  constructor(line) {
    this.hash = JSON.stringify(line).hashCode();
    if (LineToPointAdapter.cache[this.hash]) return;

    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `points for a line ${line.toString()} (no caching)`
    );

    const left = Math.min(line.start.x, line.end.x);
    const right = Math.max(line.start.x, line.end.x);
    const bottom = Math.min(line.start.y, line.end.y);
    const top = Math.max(line.start.y, line.end.y);

    const points = [];

    const isYLine = Boolean(right - left === 0);
    const isXLine = Boolean(top - bottom === 0);

    if (isYLine) {
      for (let y = bottom; y <= top; y++) {
        points.push(new Point(left, y));
      }
    }

    if (isXLine) {
      for (let x = left; x <= right; x++) {
        points.push(new Point(x, top));
      }
    }
    LineToPointAdapter.cache[this.hash] = points;
  }

  get items() {
    return LineToPointAdapter.cache[this.hash];
  }
}

LineToPointAdapter.count = 0;
LineToPointAdapter.cache = {};

//given API
const drawPoint = function (point) {
  process.stdout.write('.');
};

const vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
];

const drawPoints = function () {
  for (const vo of vectorObjects) {
    for (const line of vo) {
      const adapter = new LineToPointAdapter(line);
      adapter.items.forEach((point) => drawPoint(point));
    }
  }
};

drawPoints();
drawPoints();

// console.log(LineToPointAdapter.cache)
