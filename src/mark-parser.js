const marked = require('marked');
const katex = require('katex');

export default class MarkParser {
  static parse(rawMarkdown) {
    const rawHTML = marked(rawMarkdown);
    return MarkParser.parseKatex(rawHTML);
  }

  static parseKatex(page) {
    let pageWithMath = page;
    const regex = /\$\$(.*?)\$\$/g;
    let matchResult = null;
    while ((matchResult = regex.exec(page)) !== null) {
      const math = katex.renderToString(matchResult[1]);
      pageWithMath = pageWithMath.replace(/\$\$(.*?)\$\$/, math);
    }
    return pageWithMath;
  }
}
