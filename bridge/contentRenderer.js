class ContentRenderer {
  renderContent(content) {}
}

class WebRenderer extends ContentRenderer {
  renderContent(content) {
    console.log(`Rendering content '${content.title}' for web`);
  }
}

class MobileRenderer extends ContentRenderer {
  renderContent(content) {
    console.log(`Rendering content '${content.title}' for mobile`);
  }
}

class ContentView {
  constructor(renderer, content) {
    this.renderer = renderer;
    this.content = content;
  }

  view() {
    this.renderer.renderContent(this.content);
  }
}

class BookView extends ContentView {}

class SongView extends ContentView {}

const webRenderer = new WebRenderer();
const mobileRenderer = new MobileRenderer();

const bookViewForWeb = new BookView(webRenderer, { title: 'Design Patterns' });
const songViewForMobile = new SongView(mobileRenderer, {
  title: 'Adagio for Strings',
});

bookViewForWeb.view();
songViewForMobile.view();
