class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    const newStart = new Point(this.start.x, this.start.y);
    const newEnd = new Point(this.end.x, this.end.y);
    return new Line(newStart, newEnd);
  }
}


const point1 = new Point(0, 0);
const point2 = new Point(1, 1);
const line = new Line(point1, point2)
const line2 = line.deepCopy();
line2.start = new Point(5,5);

console.log(line);
console.log(line2)
