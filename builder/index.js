class CodeBuilder {
  constructor(className) {
    this._class = new Class(className);
  }

  addField(property) {
    this._class.fields.push(property);
    return this;
  }

  toString() {
    return this._class.toString();
  }
}

class Class {
  constructor(className) {
    this.className = className;
    this.fields = [];
  }

  addField(property) {
    this.fields.push(property);
    return this;
  }

  toMethod() {
    return eval('(' + this.toString() + ')')
  }

  toString() {
    const { parsedProperties, parsedConstructor, parsedClassName } = this; 
    return '(' + parsedClassName + parsedConstructor + parsedProperties + '})';
  }

  get parsedClassName() {
    return `class ${this.className} {` + '\n';
  }

  get parsedConstructor() {
    let parsed = '';

    if(this.fields.length) {
      parsed = `  constructor(${this.parsedArgs}) {` + '\n';
    }
    return parsed;
  }

  get parsedArgs() {
    return this.fields.join(', ');
  }

  get hasFields() {
    return this.fields.length;
  }

  get parsedProperties() {
    if(!this.hasFields) return '';

    const constructorClosingBracket = '  }\n';
    const propertyAssignments = this.fields.reduce((acc, field, index) => {
        const str =  `    this.${field} = ${field};`;
        return acc + str + '\n';
      }, '');
    return propertyAssignments + constructorClosingBracket;
  }
}

let cb = new CodeBuilder('Person')
cb.addField('name').addField('age').addField('height')
const Person = eval((cb.toString()))

const tyler = new Person('Tyler', 27, `5'10"`)
const grant = new Person('Grant', '35 or something', `'5'10" or something`)
console.log(tyler)
console.log(grant)
