/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:comment
 * @fileoverview Stringify comments.
 */

'use strict';

/* eslint-env commonjs */

/* Expose. */
module.exports = comment;

/**
 * Stringify a comment `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastComment} node - Node.
 * @return {string} - Stringified `node`.
 */
function comment(ctx, node) {
  return '<!--' + node.value + '-->';
}
