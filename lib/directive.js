'use strict';

/* Expose. */
module.exports = directive;

/* Stringify a directive `node`. */
function directive(ctx, node) {
  return '<' + node.value + '>';
}
