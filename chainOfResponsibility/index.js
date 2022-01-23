// method chain
class Creature {
  constructor(name, attack, defense) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(creature) {
    this.creature = creature;
    this.next =  null;
  }

  add(modifier) {
    if(this.next) {
      this.next.add(modifier);
    } else {
      this.next = modifier;
    }
  }

  handle() {
    if(this.next) this.next.handle();
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;
    super.handle();
  }
}

class NoBonusesModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log('No bonuses for you!');
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    if(this.creature.attack < 3) {
      console.log(`Increasing ${this.creature.name}'s defense`);
      this.creature.defense++;
    }
    super.handle();
  }
}

const goblin = new Creature('Goblin', 1, 1);
const root = new CreatureModifier(goblin);

console.log(goblin.toString());

root.add(new NoBonusesModifier(goblin));
root.add(new DoubleAttackModifier(goblin));
root.add(new IncreaseDefenseModifier(goblin));
root.handle();
console.log(goblin.toString());
/*
all nodes have the following properties:

base modifier = {
  - some_creature
  - add(modifier) => this.next ? this.next.add(modifier) : modifier
  - handle() => this.next ? this.next.handle() : return
  - this.next: null
}

const root = new CreatureModifier(goblin);

root = {
  this.next: null
}

root.add(new NoBonusesModifier(goblin)):

root = {
  this.next: { this.next: null }
}

root.add(new DoubleAttackModifier(goblin));

root = root = {
  this.next: { this.next: { this.next: null } }
}

root.add(new IncreaseDefenseModifier(goblin));

root = {
  this.next: { this.next: { this.next: { this.next: null } } }
}

root.handle();

 -- super method --
 handle() {
    if(this.next) this.next.handle();
  }

 -- child method calls super afterwards --
  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;
    super.handle();
  }
*/
