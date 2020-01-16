'use strict'

module.exports = serializeComment

function serializeComment(ctx, node) {
  return '<!--' + node.value + '-->'
}
