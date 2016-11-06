'use strict';

/* Expose. */
module.exports = characterData;

/* Stringify a character-data `node`. */
function characterData(ctx, node) {
  return '<![CDATA[' + node.value + ']]>';
}
