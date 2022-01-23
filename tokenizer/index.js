const TokenType = Object.freeze({
  integer: 0,
  plus: 1,
  minus: 2,
  lparen: 3,
  rparen: 4
});

class Integer {
  constructor(value) {
    this.value = value;
  }
}

const Operation = Object.freeze({
  addition: 0,
  subtraction: 1
});

class BinaryOperation {
  constructor() {
    this.type = null;
    this.left = null;
    this.right = null;
  }

  get value() {
    switch(this.type) {
      case Operation.addition:
        return this.left.value + this.right.value;
      case Operation.subtraction:
        return this.left.value - this.right.value;
    }
    return 0;
  }
}

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `\`${this.text}\``;
  }
}

function lex(input) {
  const result = [];
  for(let i = 0; i < input.length; i++) {
    const char = input[i]
    switch(char) {
      case '+':
        result.push(new Token(TokenType.plus, '+'));
        break;
      case '-':
        result.push(new Token(TokenType.minus, '-'));
        break;
      case '(':
        result.push(new Token(TokenType.lparen, '('));
        break;
      case ')':
        result.push(new Token(TokenType.rparen, ')'));
        break;
      default:
        const buffer = [char];
        for(let j = i + 1; j < input.length; j++) {
          if('0123456789'.includes(input[j])) {
            buffer.push(input[j]);
            i++;
          } else {
            result.push(new Token(TokenType.integer, buffer.join('')));
            break
          }
        }
    }
  }
  return result;
}

function parse(tokens) {
  const result = new BinaryOperation();
  let haveLHS = false;

  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch(token.type) {
      case TokenType.integer:
        const integer = new Integer(parseInt(token.text));
        if(!haveLHS) {
          result.left = integer;
          haveLHS = true;
        } else {
          result.right = integer;
        }
        break;
      case TokenType.plus:
        result.type = Operation.addition;
        break;
      case TokenType.minus:
        result.type = Operation.subtraction;
        break;
      case TokenType.lparen:
        for(let j = i; j < tokens.length; j++) {
          if(tokens[j].type === TokenType.rparen) {
            break;
          }
          const subexpression = tokens.slice(i + 1, j);
          const element = parse(subexpression);
          if(!haveLHS) {
            result.left = element;
            haveLHS = true;
          } else {
            result.right = element;
          }
          i = j;
          break;
        }
    }
  }
  return result;
}
const input = "(13+4)-(12+1)";
const tokens = lex(input);
console.log(tokens.join('   '));

const parsed = parse(tokens);
console.log(`${input} = ${parsed.value}`);


class ExpressionProcessor {
  constructor() {
    this.variables = {};
    this.nextOp = Object.freeze({
      nothing: 0,
      plus: 1,
      minus: 2
    });
  }

  splitWithoutRegex(input) {
    const result = [];
    let buffer = [];

    for (const char of input) {
      if (char === '+' || char === '-') {
        const final = `${buffer.join('')}${char}`;
        result.push(final);
        buffer = [];
      } else {
        buffer.push(char);
      }
    }

    if (buffer.length > 0) {
      result.push(buffer.join(''));
    }
    return result;
  }

  calculate(expression) {
    let current = 0;
    let nextOp = this.nextOp.nothing;
    //let parts = expression.split(/(?<=[+-])/);
    const parts = this.splitWithoutRegex(expression);
    for (const part of parts) {
      const noop = part.split("+-"), first = noop[0];
      let value = 0, z = parseInt(first);

      if (!isNaN(z)) {
        value = z;
      } else if (first.length === 1 && this.variables[first[0]] !== undefined) {
        value = this.variables[first[0]];
      } else {
        return 0;
      }

      switch (nextOp) {
        case this.nextOp.nothing:
          current = value;
          break;
        case this.nextOp.plus:
          current += value;
          break;
        case this.nextOp.minus:
          current -= value;
          break;
      }

      if (part.endsWith('+')) {
        const result = [];
      } else if (part.endsWith('-')) {
        nextOp = this.nextOp.minus;
      }
    }
    return current;
  }
}

