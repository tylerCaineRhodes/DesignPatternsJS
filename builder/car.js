class Car {
  constructor() {
    this.parts = {};
  }

  listParts() {
    return `Car parts: ${Object.values(this.parts).join(', ')}`;
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  addEngine() {
    this.car.parts.engine = 'V8 Engine';
    return this;
  }

  addWheels() {
    this.car.parts.wheels = '4 Wheels';
    return this;
  }

  addGPS() {
    this.car.parts.gps = 'GPS Navigator';
    return this;
  }

  getCar() {
    const result = this.car;
    this.reset();
    return result;
  }

  reset() {
    this.car = new Car();
  }
}

class Director {
  constructSportsCar(builder) {
    builder.reset();
    builder.addEngine().addWheels().addGPS();
    return builder.getCar();
  }
}

const builder = new CarBuilder();
const director = new Director();

const car = director.constructSportsCar(builder);
console.log(car.listParts());
