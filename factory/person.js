class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.sequence = 0;
  }

  createPerson(name) {
    const person = new Person(this.sequence, name);
    this.sequence += 1;
    return person;
  }
}

const pf = new PersonFactory();

const tyler = pf.createPerson('tyler');
const grant = pf.createPerson('grant');
const kurtis = pf.createPerson('kurtis');

console.log({ tyler })
console.log({ grant })
console.log({ kurtis })