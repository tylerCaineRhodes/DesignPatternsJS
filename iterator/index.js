class Stuff {
  constructor() {
    this.a = 11;
    this.b = 22;
  }

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        const current = i;
        i += 1;
        return { done: current > 1, value: this[current === 0 ? 'a': 'b'] }
      }
    }
  }

  get backwards() {
    let i = 0;
    return {
      next: () => {
        const current = i;
        i += 1;
        return {
          done: current > 1,
          value: this[current === 0  ? 'b' : 'a']
        }
      },
      [Symbol.iterator]: function() {
        return this;
      }
    }
  }
}

const stuff = new Stuff();
for(const item of stuff) console.log(item)
for(const item of stuff.backwards) console.log(item)

function makeInOrderIterator(root) {
  let curr = root;
  let yieldedStart = false;

  //go to the leftmost node
  while(curr.left) curr = curr.left;

  return {
    next: () => {
      if(!yieldedStart) {
        yieldedStart = true;
        return { value: curr, done: false };
      }

      //return right
      if(curr.right) {
        curr = curr.right;
        while(curr.left) curr = curr.left
        return { value: curr, done: false }
      }

      //if there's no right child, that means this is the leftmost child
      let p = curr.parent;
      while(p && curr === p.right) {
        curr = p;
        p = p.parent
      }
      curr = p;
      return { value: curr, done: curr === null }
    },
    [Symbol.iterator]: function() { return this; }
  };
}

class Node  {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;

    if(this.left) this.left.parent = this;
    if(this.right) this.right.parent = this;
  }
}

class BinaryTree {
  constructor(rootNode) {
    this.rootNode = rootNode;
  }

  *betterInOrder() {
    function *traverse(curr) {
      if(curr.left) {
        for(const left of traverse(curr.left)) {
          yield left;
        }
      }

      yield curr;

      if(curr.right) {
        for(const right of traverse(curr.right)) {
          yield right;
        }
      }
    }
    for(const node of traverse(this.rootNode)) {
      yield node;
    }
  }
}

const root = new Node(1, new Node(2), new Node(3));
const bt = new BinaryTree(root);
let next =  bt.betterInOrder()[0];
console.log(next)


class Node {
  constructor(value, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value
  }

  *preorder() {
    function *traverse(curr) {
      yield curr;

      if(curr.left) {
        for(const left of traverse(curr.left))  {
          yield left;
        }
      }

      if(curr.right) {
        for(const right of traverse(curr.right)) {
          yield right;
        }
      }
    }
    for(const node of traverse(this)) {
      console.log(node.value)
      yield node.value;
    }
  }
}
