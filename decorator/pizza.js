class Pizza {
  get description() {
    return 'Plain pizza';
  }

  get cost() {
    return 10;
  }
}

class PizzaToppingDecorator {
  constructor(pizza) {
    this.pizza = pizza;
  }

  get description() {
    return this.pizza.description;
  }

  get cost() {
    return this.pizza.cost;
  }
}

class CheeseDecorator extends PizzaToppingDecorator {
  get description() {
    return this.pizza.description + ', Cheese';
  }

  get cost() {
    return this.pizza.cost + 2;
  }
}

class TomatoDecorator extends PizzaToppingDecorator {
  get description() {
    return this.pizza.description + ', Tomato';
  }

  get cost() {
    return this.pizza.cost + 3;
  }
}

const pizza = new Pizza();

pizza = new CheeseDecorator(pizza);
pizza = new TomatoDecorator(pizza);

console.log(pizza.description);
console.log(pizza.cost);
