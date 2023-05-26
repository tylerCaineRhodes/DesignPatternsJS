class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    const m = new Memento(this.balance);

    this.changes.push(m);
    this.current++;

    return m;
  }

  restore(m) {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.length - 1;
    }
  }

  undo() {
    if (this.current > 0) {
      this.current--;
      const m = this.changes[this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  redo() {
    if (this.current < this.changes.length - 1) {
      this.current++;
      const m = this.changes[this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

const ba = new BankAccount(100);
const m1 = ba.deposit(50);
const m2 = ba.deposit(25);
console.log(ba.toString());

ba.restore(m1);
console.log(ba.toString());
ba.restore(m2);
console.log(ba.toString());

ba.undo();
console.log('undo #1:', ba.toString());
ba.undo();
console.log('undo #2:', ba.toString());
ba.redo();
console.log('redo #1:', ba.toString());

class Token {
  constructor(value = 0) {
    this.value = value;
  }
}

class Memento {
  constructor() {
    this.tokens = [];
  }
}

class TokenMachine {
  constructor() {
    this.tokens = [];
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    this.tokens.push(token);
    const m = new Memento(token);
    m.tokens = this.tokens.map(t => new Token(t.value))
    return m;
  }

  revert(m) {
    this.tokens = this.tokens.map(t => new Token(t.value))
  }
}
