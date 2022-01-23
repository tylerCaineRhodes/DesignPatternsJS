const fs = require('fs');
const path = require('path');

//low level module
class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;
    if(instance) return instance;

    this.constructor.instance = this;
    console.log('Initializing database');
    this.capitals = {};

    const lines = fs.readFileSync(
      path.join(__dirname, 'capitals.txt')
    ).toString().split('\n');


    for(let i = 0; i < lines.length / 2; i++) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

const db1 = new MyDatabase();
console.log(db1)

//high-level module
class SingletonRecordFinder {
  totalPopulation(cities) {
    return cities
      .map((city) => new MyDatabase().getPopulation(city))
      .reduce((acc, val) => acc + val);
  }
}


class ConfigurableRecordFinder {
  constructor(database=new MyDatabase()) {
    this.database = database;
  }

  totalPopulation(cities) {
    return cities
      .map((city) => this.database.getPopulation(city))
      .reduce((acc, val) => acc + val);
  }
}

