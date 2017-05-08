import Page from './page'

export default class Slideshow {
  constructor(pages) {
    this.pages = pages;
  }

  static parse(text) {
    const rawPages = text.split(/---\n/);
    const pages = rawPages.map((rawPage, index) => new Page(index, rawPage));
    return new Slideshow(pages);
  }
}
