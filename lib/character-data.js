/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:character-data
 * @fileoverview Stringify CDATA.
 */

'use strict';

/* eslint-env commonjs */

/* Expose. */
module.exports = characterData;

/**
 * Stringify a character-data `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastCharacterData} node - Node.
 * @return {string} - Stringified `node`.
 */
function characterData(ctx, node) {
  return '<![CDATA[' + node.value + ']]>';
}
