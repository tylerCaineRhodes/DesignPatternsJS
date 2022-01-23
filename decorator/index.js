class Shape {}

class Circle extends Shape {
  constructor(radius=0) {
    super();
    this.radius = radius;
  }
  
  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

   toString() {
    return `${this.shape.toString()} has ` +
    `${this.transparency * 100.0}% transparency`;
  }
}

const circle = new Circle(2);
const redCircle = new ColoredShape(circle, 'red');
const redHalfCircle = new TransparentShape(redCircle, 0.5);

console.log(circle.toString())
console.log(redCircle.toString());
console.log(redHalfCircle.toString());

