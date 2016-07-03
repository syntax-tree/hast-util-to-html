// Dependencies:
var h = require('hastscript');
var toHTML = require('./index.js');

// Transform:
var tree = h('.alpha', [
  'bravo ',
  h('b', 'charlie'),
  ' delta ',
  h('a.echo', {
    download: true
  }, 'foxtrot')
]);

// Yields:
console.log('html', toHTML(tree));
