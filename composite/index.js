'use strict';

class Connectable {
  connectTo(other) {
    for(const from of this) {
      for(const to of other) {
        from.out.push(to);
        to.in.push(from);
      }
    }
  }
}

function connectable(Base) {
  class Connectable extends Base {
    constructor() {
      super();
    }
    connectTo(other) {
      for(const from of this) {
        for(const to of other) {
          from.out.push(to);
          to.in.push(from);
        }
      }
    }
  }
  return Connectable;
}

class Neuron extends Connectable {
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }
  toString() {
    return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
  }

  [Symbol.iterator]() {
    let returned = false;
    return { next: () => ({ value: this, done: returned++ })}
  }
}

class NeuronLayer extends extender({ baseClass: Array }, connectable) {
  constructor(count) {
    super();
    while(count --> 0) {
      this.push(new Neuron());
    }
  }
  toString() {
    return `A layer with ${this.length} neurons`;
  }
}

function extender({ baseClass }, ...classFunctions) {
  return classFunctions.reduce((accumulator, classFunction) => {
    return classFunction(accumulator)
  }, baseClass);
}

const neuron1 = new Neuron();
const neuron2 = new Neuron();
const layer1 = new NeuronLayer(3);
const layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer2);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);
console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());

