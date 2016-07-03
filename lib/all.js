/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:character-data
 * @fileoverview Stringify CDATA.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var one = require('./one');

/* Expose. */
module.exports = all;

/**
 * Stringify all children of `parent`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastNode} parent - Parent.
 * @return {string} - Stringified children.
 */
function all(ctx, parent) {
  var children = parent && parent.children;
  var length = children && children.length;
  var index = -1;
  var results = [];

  while (++index < length) {
    results[index] = one(ctx, children[index], index, parent);
  }

  return results.join('');
}
