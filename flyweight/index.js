class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).fill().map((val) => false);
  }

  capitalize(start, end) {
    for (let i = start; i <= end; i++) {
      this.caps[i] = true;
    }
  }

  toString() {
    const buffer = [];
    for (const i in this.plainText) {
      const c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }
    return buffer.join('');
  }
}

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    const range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    const buffer = [];
    for (const i in this.plainText) {
      let c = this.plainText[i];
      for (const range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          c = c.toUpperCase();
        }
      }
      buffer.push(c);
    }
    return buffer.join('');
  }
}

class TextRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

const text = 'This is a brave new world';
const ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

const bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());

class User {
  constructor(fullName) {
    this.fullName = fullName;
  }
}

class User2 {
  constructor(fullName) {
    const getOrAdd = function (s) {
      const idx = User2.strings.indexOf(s);

      if (idx !== -1) {
        return idx;
      } else {
        User2.strings.push(s);
        return User2.strings.length - 1;
      }
    };
    fullName.split(' ').map(getOrAdd);
  }
}

User2.strings = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomString() {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  }
  return result.join('');
}

const users = [];
const users2 = [];
const firstNames = [];
const lastNames = [];

for (let i = 0; i < 100; i++) {
  firstNames.push(randomString());
  lastNames.push(randomString());
}

for (const first of firstNames) {
  for (const last of lastNames) {
    users.push(new User(`${first} ${last}`));
    users2.push(new User2(`${first} ${last}`));
  }
}

console.log(`10k users take up approx ${JSON.stringify(users).length} chars`);
const users2Length = [users2, User2.strings]
  .map((x) => JSON.stringify(x).length)
  .reduce((acc, val) => acc + val, 0);
console.log(`10k flyweight users take up approx ${users2Length} chars`);

class CapitalizeHandler {
  constructor() {
    this.capitalize = false;
  }
}

class Sentence {
  constructor(plainText) {
    this.indices = plainText.split(' ').map(() => new CapitalizeHandler());
    this.plainText = plainText;
    console.log(this.indices);
  }

  at(index) {
    return this.indices[index];
  }

  toString() {
    return this.plainText
      .split(' ')
      .map((val, i) => {
        if (this.indices[i].capitalize) {
          return val.toUpperCase();
        }
        return val;
      })
      .join(' ');
  }
}

const s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString());
