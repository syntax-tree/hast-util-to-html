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
var has = require('has');

/* Expose. */
module.exports = one;

/* Handlers. */
var handlers = {};

handlers.root = require('./all');
handlers.text = require('./text');
handlers.element = require('./element');
handlers.doctype = require('./doctype');
handlers.comment = require('./comment');
handlers.raw = require('./raw');

/* Deprecated */
handlers.directive = require('./directive');
handlers.characterData = require('./character-data');

/**
 * Stringify `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastNode} node - Node.
 * @param {number} [index] - Location of node in `parent`.
 * @param {HastNode?} [parent] - Parent of `node`, when
 *   applicable.
 * @return {string} - Stringified `node`.
 * @throws {Error} - When `node` cannot be stringified.
 */
function one(ctx, node, index, parent) {
  var type = node && node.type;

  if (!type) {
    throw new Error('Expected node, not `' + node + '`');
  }

  if (!has(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`');
  }

  return handlers[type](ctx, node, index, parent);
}
