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
var has = require('has');

/* Expose. */
module.exports = omission;

/**
 * Factory to check if a given node can have a tag omitted.
 *
 * @param {Object.<Function>} handlers
 *   - Map of tag-names to handlers.
 * @return {Function} - Checker.
 */
function omission(handlers) {
  /**
   * Check if a given node can have a tag omitted.
   *
   * @param {HastElement} node - Node to check.
   * @param {number} [index] - Position of `node` in `parent`.
   * @param {HastParent} [parent] - Parent of `node`.
   * @return {boolean} - Whether a tag can be omitted.
   */
  return function (node, index, parent) {
    var name = node.tagName;
    var fn = has(handlers, name) ? handlers[name] : false;

    return fn ? fn(node, index, parent) : false;
  };
}
