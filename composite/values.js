class SingleValue {
  constructor(value) {
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return { next: () => ({ value: this.value, done: returned++ })}
  }
}

SingleValue.prototype.reduce = () => 'my custom reduce function';

class ManyValues extends Array {}

function sum(containers) {
  return containers.reduce((totalSum, numbers) => {
    for(const val of numbers) {
      totalSum += val;
    }
    return totalSum;
  }, 0);
}

const singleValue = new SingleValue(11);
const otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

console.log(sum([singleValue, otherValues]))
