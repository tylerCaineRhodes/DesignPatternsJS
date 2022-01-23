class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) return instance;

    this.constructor.instance = this;
  }
}

//Monostate: many instances, shared data
class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }

  set name(value) {
    return ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }

  set age(value) {
    return ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} and he is ${this.age} years old.`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

