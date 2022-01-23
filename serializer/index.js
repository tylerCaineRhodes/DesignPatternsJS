class Address {
  constructor(suite, city, country) {
    this.suite = suite;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Suite: ${this.suite}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    return `Hi, my name is ${this.name}, I live at ${this.address.toString()} `;
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  reconstructRecursive(object) {
    if(!(object.hasOwnProperty('typeIndex'))) return object;
    const type = this.types[object.typeIndex];
    const obj = new type();

    for(const key in object) {
      if (key in object && object[key]) {
        obj[key] = this.reconstructRecursive(object[key]);
      }
    }
    delete obj.typeIndex;
    return obj;
  }

  addTypeMarks(object) {
    const idx = this.types.findIndex((t) => t.name === object.constructor.name);

    if(idx !== -1) {
      object['typeIndex'] = idx;
      this.forEachProp(object, this.addTypeMarks.bind(this));
    }
  }

  forEachProp(object, callback) {
    for(const key in object) {
      if (key in object && object[key]) {
        callback(object[key]);
      }
    }
  }

  removeTypeMarks(object) {
    const idx = this.types.findIndex((t) => t.name === object.constructor.name);

    if(idx !== -1) {
      delete object.typeIndex;
      this.forEachProp(object, this.removeTypeMarks.bind(this));
    }
  }

  clone(object) {
    this.addTypeMarks(object);
    const copy = JSON.parse(JSON.stringify(object));
    this.removeTypeMarks(object);
    return this.reconstructRecursive(copy)
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} works at ${this.address}`;
  }

  greet() {
    console.log(`Hi, my name is ${this.name}, I work at ${this.address.toString()}`);
  }
}


class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    const copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, '123 East Dr', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 London Rd', 'Oxford'));

const john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john.toString());
console.log(jane.toString());
