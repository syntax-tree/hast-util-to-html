/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:omission
 * @fileoverview Check if a tag can be omitted.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var is = require('unist-util-is');
var whiteSpace = require('hast-util-whitespace');

/* Expose. */
module.exports = whiteSpaceLeft;

/**
 * Check if `node` starts with white-space.
 *
 * @param {Node} node - Node to check.
 * @return {boolean} - Whether `node` starts with white-space.
 */
function whiteSpaceLeft(node) {
  return is('text', node) && whiteSpace(node.value.charAt(0));
}
