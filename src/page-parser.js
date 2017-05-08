export default class PageParser {
  static parseMeta(page) {
    const lines = page.split('\n').filter(row => row.length >= 1);
    const pageInfo = {};
    const isKeyStart = lines.map(line => line.match(/^[a-zA-Z_]+:/));

    if (isKeyStart[0] !== null) {
      for (let i = 0 ; i < lines.length ; ) {
        const keyLen = isKeyStart[i][0].length;
        const key = isKeyStart[i][0].substr(0, keyLen-1);
        const values = [lines[i].substr(keyLen).trim()];
        let j = i+1;
        while (j < lines.length && !isKeyStart[j]) {
          values.push(lines[j]);
          j++;
        }
        pageInfo[key] = values.join('\n').trim();
        i = j;
      }
      return pageInfo;
    } else {
      return {
        title: '',
        template: 'default',
        body: page
      }
    }
  }
}
