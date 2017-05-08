import PageParser from './page-parser'
import MarkParser from './mark-parser'

export default class Page {
  constructor(index, rawText) {
    this.index = index;
    this.rawText = rawText;

    this.meta = PageParser.parseMeta(rawText);
    this.html = Page.makeContents(this.meta);
  }

  static makeContents(meta) {
    let html = '';
    switch (meta.template) {
      case 'title':
        html = '<div class="container"><h1 id="title">' + meta.title + '</h1></div>';
        break;
      case 'default':
        html = '<div class="container">' + MarkParser.parse(meta.body) + '</div>';
        break;
      case 'twopane':
        const title = '<h1>' + meta.title + '</h1>'
        const left = '<div class="twopane_left">' + MarkParser.parse(meta.bodyLeft) + '</div>';
        const right = '<div class="twopane_right">' + MarkParser.parse(meta.bodyRight) + '</div>';

        html = title + '<div class="container">' + left + right + '</div>';
        break;
      default:
        throw 'unknown template type: ' + meta.template + ' at page ' + this.index;
    }
    return html;
  }
}
