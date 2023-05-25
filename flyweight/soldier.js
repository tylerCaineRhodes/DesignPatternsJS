class SoldierType {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
}

class SoldierTypeFactory {
  constructor() {
    this.soldierTypes = {};
  }

  getSoldierType(name, weapon) {
    let soldierType = this.soldierTypes[name];

    if (!soldierType) {
      soldierType = new SoldierType(name, weapon);
      this.soldierTypes[name] = soldierType;
    }

    return soldierType;
  }
}

class Soldier {
  constructor(name, health, soldierType) {
    this.name = name;
    this.health = health;
    this.soldierType = soldierType;
  }
}

const soldierTypeFactory = new SoldierTypeFactory();
const privateSoldierType = soldierTypeFactory.getSoldierType(
  'Private',
  'Rifle'
);
const sergeantSoldierType = soldierTypeFactory.getSoldierType(
  'Sergeant',
  'Shotgun'
);

const soldier1 = new Soldier('Soldier 1', 100, privateSoldierType);
const soldier2 = new Soldier('Soldier 2', 100, privateSoldierType);
const soldier3 = new Soldier('Soldier 3', 100, sergeantSoldierType);
