const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log('this tea is nice with lemon!')
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('this coffee is delicious!')
  }
}


class HotDrinkFactory {
  prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount} ml`)
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount} ml`)
    return new Coffee();
  }
}

const AvailableDrinks = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
})


class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for(const drink in AvailableDrinks) {
      this.factories[drink] = new AvailableDrinks[drink]();
    }
  }

  interact(consumer) {
    rl.question('Please specify drink and amount ' +
     '(e.g, tea 50)', (answer) => {
       const parts = answer.split(' ');
       const name = parts[0];
       const amount = parseInt(parts[1]);
       const d = this.factories[name].prepare(amount)
       rl.close();
       consumer(d)
     })
  }
  makeDrink(type) {
    switch(type) {
      case 'tea':
        return new TeaFactory().prepare();
      case 'coffee':
        return new CoffeeFactory().prepare();
      default:
        throw new Error('not sure what to do here')
    }
  }
}

const machine = new HotDrinkMachine();
machine.interact((drink) => drink.consume());

