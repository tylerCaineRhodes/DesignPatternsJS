// broker chain - event broker
class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(this.count + 1, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    this.handlers.forEach((key, val) => {
      key(sender, args);
    })
  }
}

const WhatToQuery = Object.freeze({
  'attack': 1,
  'defense': 2
});

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

// centralized component
class Game {
  constructor() {
    // which exposes a shared object
    this.queries = new Event();
  }

  performQuery(sender, query) {
    this.queries.fire(sender, query);
  }
}

class Creature {
  constructor(game, name, attack, defense) {
    this.game = game;
    this.name = name;
    this.initialAttack = attack;
    this.initialDefense = defense;
  }

  get attack() {
    const q = new Query(this.name, WhatToQuery.attack, this.initialAttack)
    this.game.performQuery(this, q);
    return q.value;
  }

  get defense() {
    const q = new Query(this.name, WhatToQuery.defense, this.initialDefense)
    this.game.performQuery(this, q);
    return q.value;
  }

  toString() {
    return `${this.name}(${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(game, creature) {
    this.game = game;
    this.token = game.queries.subscribe(this.handle.bind(this));
    this.creature = creature;
  }

  handler(sender, query) {}

  dispose() {
    this.game.queries.unsubscribe(this.token);
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature);
  }

  handle(sender, query) {
    if(query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.attack) {
      query.value *= 2;
    }
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature);
  }

  get creature() {
    return super.creature;
  }

  set creature(val){
    super.creature = val;
  }

  handle(sender, query) {
    if(query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.defense) {
      query.value += 1;
    }
  }
}

const game = new Game();
const goblin = new Creature(game, 'String Goblin', 2, 2);
console.log(goblin.toString());

const dam = new DoubleAttackModifier(game, goblin);
console.log(goblin.toString());

const idm = new IncreaseDefenseModifier(game, goblin);
console.log(goblin.toString());

idm.dispose();
console.log(goblin.toString());

