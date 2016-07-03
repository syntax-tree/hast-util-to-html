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
var text = require('./text');

/* Expose. */
module.exports = raw;

/**
 * Stringify `raw`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastCharacterData} node - Node.
 * @return {string} - Stringified `node`.
 */
function raw(ctx, node) {
  return ctx.dangerous ? node.value : text(ctx, node);
}
