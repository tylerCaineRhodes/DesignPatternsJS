class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
    this.room = undefined;
  }

  receive(sender, message) {
    const s = `${sender}: '${message}'`;
    this.chatLog.push(s);
    console.log(`[${this.name}'s chat session] ${s}`);
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  constructor() {
    this.people = [];
  }

  join(p) {
    const joinMsg = `${p.name} joins the chat`;
    this.broadcast('room', joinMsg);
    p.room = this;
    this.people.push(p);
  }

  broadcast(source, message) {
    for(const p of this.people) {
      if(p.name !== source) {
        p.receive(source, message);
      }
    }
  }

  message(source, destination, message) {
    for(const p of this.people) {
      if(p.name === destination) {
        p.receive(source, message)
      }
    }
  }
}

const room = new ChatRoom();
const john = new Person('John');
const jane = new Person('Jane');
const simon = new Person('Simon');

room.join(john);
room.join(jane);

john.say('hi room');
jane.say('oh, hey john');

room.join(simon);
simon.say('hi everyone!');
jane.pm('Simon', 'glad you could join us');


class Mediator {
  constructor() {
    this.participants = [];
  }

  broadcast({ sender, value }) {
    for(const participant of this.participants) {
      if(participant !== sender) {
        participant.value += value;
      }
    }
  }
}

class Participant {
  constructor(mediator) {
    this.mediator = mediator;
    this.mediator.participants.push(this);
    this.value = 0;
  }

  say(n) {
    this.mediator.broadcast({ sender: this, value: n });
  }
}

