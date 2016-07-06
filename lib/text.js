/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:text
 * @fileoverview Stringify text.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var xtend = require('xtend');
var entities = require('stringify-entities');

/* Expose. */
module.exports = text;

/**
 * Check if content of `node` should be escaped.
 *
 * @param {Node} node - Node to check.
 * @return {boolean} - Whether `node` should be escaped.
 */
function isLiteral(node) {
  return node && (node.tagName === 'script' || node.tagName === 'style');
}

/**
 * Stringify a text `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastText} node - Node.
 * @param {number} [index] - Location of node in `parent`.
 * @param {HastParent?} [parent] - Parent of `node`.
 * @return {string} - Stringified `node`.
 */
function text(ctx, node, index, parent) {
  var value = node.value;

  return isLiteral(parent) ? value : entities(value, xtend(ctx.entities, {
    subset: ['<', '&']
  }));
}
