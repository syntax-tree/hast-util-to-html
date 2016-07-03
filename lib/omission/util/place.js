/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:omission
 * @fileoverview Check if a tag can be omitted.
 */

'use strict';

/* eslint-env commonjs */

/* Expose. */
module.exports = place;

/**
 * Get the position of `node` in `parent`.
 *
 * @param {Node} parent - Parent node.
 * @param {Node} child - Child node.
 * @return {number?} - Position of `child` in `parent`.
 */
function place(parent, child) {
  return parent && parent.children && parent.children.indexOf(child);
}
