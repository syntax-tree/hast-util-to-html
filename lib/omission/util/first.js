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
var after = require('./siblings').after;

/* Expose. */
module.exports = first;

/**
 * Get the first child in `parent`.
 *
 * @param {Node} parent - Parent node.
 * @param {boolean} [includeWhiteSpace=false] - Whether to
 *   treat white-space as applicable.
 * @return {Node?} - First child.
 */
function first(parent, includeWhiteSpace) {
  return after(parent, -1, includeWhiteSpace);
}
