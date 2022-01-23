class Bird {
  constructor(age=0) {
    this.age = age;
  }

  fly() {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard {
  constructor(age=0) {
    this.age = age;
  }

  crawl() {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon {
  constructor(age=0) {
    this.lizard = new Lizard();
    this.bird = new Bird();
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = this.bird.age = this.lizard.age = value;
  }

  crawl() {
    return this.lizard.crawl();
  }

  fly() {
    return this.bird.fly();
  }
}
