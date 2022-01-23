const WhatToQuery = Object.freeze({
  'attack': 1,
  'defense': 2
});

class Query {
  constructor(whatToQuery, result) {
    this.whatToQuery = whatToQuery;
    this.result = result;
  }
}

class Goblin {
  constructor(game, baseAttack=1, baseDefense=1) {
    this.game = game;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;

    game.creatures.push(this);
  }

  handleQuery({ source, query }) {
    if (source === this) {
      switch (query.whatToQuery) {
        case WhatToQuery.attack:
          query.result += this.baseAttack;
          break;
        case WhatToQuery.defense:
          query.result += this.baseDefense;
          break;
      }
    } else if (query.whatToQuery === WhatToQuery.defense) {
      query.result += 1;
    }
  }

  get defense() {
    const query = new Query(WhatToQuery.defense, 0);
    this.game.creatures.forEach(creature => {
      creature.handleQuery({ source: this, query })
    })
    return query.result;
  }

  get attack() {
    const query = new Query(WhatToQuery.attack, 0);
    this.game.creatures.forEach(creature => {
      creature.handleQuery({ source: this, query: query })
    })
    return query.result;
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    super(game, 3, 3);
  }

  handleQuery({ source, query }) {
    if (source !== this && query.whatToQuery === WhatToQuery.attack) {
      query.result += 1;
    }
    super.handleQuery({ source, query });
  }
}

class Game {
  constructor() {
    this.creatures = [];
  }
}
