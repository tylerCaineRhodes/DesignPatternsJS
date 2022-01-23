class Shape {
  constructor(name, renderer) {
    this.name = name;
    this.renderer = renderer;
  }

  toString() {
    return this.renderer.toString(this.name);
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super('Triangle', renderer);
  }
}

class Square extends Shape {
  constructor(renderer) {
    super('square', renderer);
  }
}

class VectorRenderer {
  toString(shape) {
    return `Drawing ${shape} as lines`;
  }
}

class RasterRenderer {
  toString(shape) {
    return `Drawing ${shape} as pixels`;
  }
}

const rasterSquare = new Square(new RasterRenderer());
const vectorSquare = new Square(new VectorRenderer());
const rasterTriangle = new Triangle(new RasterRenderer());
const vectorTriangle = new Triangle(new VectorRenderer());

console.log('raster square:', rasterSquare.toString());
console.log('vector square:', vectorSquare.toString());
console.log('raster triangle:', rasterTriangle.toString());
console.log('vector triangle:', vectorTriangle.toString());

//renderer - vector, raster
//shape
