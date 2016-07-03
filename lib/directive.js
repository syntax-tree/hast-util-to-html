/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:directive
 * @fileoverview Stringify directives.
 */

'use strict';

/* eslint-env commonjs */

/* Expose. */
module.exports = directive;

/**
 * Stringify a directive `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastDirective} node - Node.
 * @return {string} - Stringified `node`.
 */
function directive(ctx, node) {
  return '<' + node.value + '>';
}
