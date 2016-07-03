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
var whiteSpace = require('hast-util-whitespace');

/* Find siblings. */
exports.before = siblings(-1);
exports.after = siblings(1);

/**
 * Factory to check siblings in a direction.
 *
 * @param {number} increment - `1` or `-1`.
 * @return {Function} - Finder.
 */
function siblings(increment) {
  /**
   * Find applicable siblings in a direction.
   *
   * @param {Node} parent - Parent node.
   * @param {number} index - Initial location.
   * @param {boolean} [includeWhiteSpace=false] - Whether to
   *   treat white-space as applicable.
   * @return {Node?} - Adjacent sibling.
   */
  return function (parent, index, includeWhiteSpace) {
    var siblings = parent && parent.children;
    var next;

    index += increment;
    next = siblings && siblings[index];

    if (!includeWhiteSpace) {
      while (next && whiteSpace(next)) {
        index += increment;
        next = siblings[index];
      }
    }

    return next;
  };
}
