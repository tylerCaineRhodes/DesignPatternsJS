class VectorRenderer {
  renderCircle(radius) {
    console.log(`Drawing a circle for ${radius}`);
  }
}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels for a circle of radius ${radius}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor
  }
}

const raster = new RasterRenderer();
const vector = new VectorRenderer();
const circle = new Circle(vector, 5);
circle.draw();
circle.resize(2);
circle.draw();

class Square {}

//Shape - Square, Circle ....
//Renderer - Raster, Vector ....

