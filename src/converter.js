#!/usr/bin/env node

import Slideshow from './slideshow';

const fs = require('fs');
const args = require('command-line-args');
const marked = require('marked');
const mustache = require('mustache');
const katex = require('katex');

const encoding = { encoding: 'utf8' };

const options = args([
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'in', type: String },
  { name: 'out', type: String }
]);

const input = fs.readFileSync(options['in'], encoding);
const slideShow = Slideshow.parse(input);

const contents = slideShow.pages.map(page => {
  return { id: page.index, contents: page.html }
});

const meta = {
  title: slideShow.pages[0].title,
  background: '#ace'
};

const htmlTemplate = fs.readFileSync('./templates/template.html', encoding);
const cssTemplate = fs.readFileSync('./templates/style.css', encoding);
const slideScript = fs.readFileSync('./templates/main.js', encoding);

const css = mustache.render(cssTemplate, { background: meta['background'] || '#fff' });
const output = mustache.render(htmlTemplate, {
  title: meta['title'] || 'title',
  contents: JSON.stringify(contents),
  css: css,
  slidescript: slideScript
});

if (options['out']) {
  fs.writeFileSync(options['out'], output, encoding);
} else {
  process.stdout.write(output);
}
