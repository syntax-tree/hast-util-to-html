'use strict';

/* Expose. */
module.exports = comment;

/* Stringify a comment `node`. */
function comment(ctx, node) {
  return '<!--' + node.value + '-->';
}
