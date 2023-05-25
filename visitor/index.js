class DocumentPart {
  accept(visitor) {}
}

class Text extends DocumentPart {
  constructor(text) {
    super();
    this.text = text;
  }

  accept(visitor) {
    visitor.visitText(this);
  }
}

class Hyperlink extends DocumentPart {
  constructor(url, label) {
    super();
    this.url = url;
    this.label = label;
  }

  accept(visitor) {
    visitor.visitHyperlink(this);
  }
}

class DocumentPartVisitor {
  visitText(textPart) {}

  visitHyperlink(hyperlinkPart) {}
}

class HtmlVisitor extends DocumentPartVisitor {
  visitText(textPart) {
    console.log(`Rendering text: ${textPart.text}`);
  }

  visitHyperlink(hyperlinkPart) {
    console.log(
      `Rendering hyperlink: <a href='${hyperlinkPart.url}'>${hyperlinkPart.label}</a>`
    );
  }
}

const documentParts = [
  new Text('Hello, world!'),
  new Hyperlink('https://www.example.com', 'Click me'),
];

const htmlVisitor = new HtmlVisitor();

for (const part of documentParts) {
  part.accept(htmlVisitor);
}
