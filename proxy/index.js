//value proxy
class Percentage {
  constructor(percent) {
    this.percent = percent;
  }

  toString() {
    return `${this.percent}%`;
  }

  //for calculations
  valueOf() {
    return this.percent / 100;
  }
}

const fivePercent = new Percentage(5);
console.log(`5% of 50 is ${50 * fivePercent}`)


//property proxy
class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if(this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, 'agility');
  }

  get agility() {
    this._agility.value;
  }

  set agility(value) {
    this._agility.value = value
  }
}

const c = new Creature();
c.agility = 12;
c.agility = 13;


//virtual proxy
class LazyImage {
  constructor(url) {
    this.url = url;
  }
  draw() {
    if(!this.image) {
      this.image = new Image(this.url);
      this.image.draw();
    }
  }
}

class Image {
  constructor(url) {
    this.url = url;
    console.log(`Loading image from ${url}`);
  }
  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

function drawImage(img) {
  console.log('About to draw the image')
  img.draw();
  console.log('Done drawing the image')
}

const img = new LazyImage('http://pokemon.com/pikachu.png');
drawImage(img);
