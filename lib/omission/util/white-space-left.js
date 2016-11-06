'use strict';

/* Dependencies. */
var is = require('unist-util-is');
var whiteSpace = require('hast-util-whitespace');

/* Expose. */
module.exports = whiteSpaceLeft;

/* Check if `node` starts with white-space. */
function whiteSpaceLeft(node) {
  return is('text', node) && whiteSpace(node.value.charAt(0));
}
