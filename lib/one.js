'use strict'

module.exports = serialize

var own = {}.hasOwnProperty

var handlers = {}

handlers.root = require('./all')
handlers.text = require('./text')
handlers.element = require('./element')
handlers.doctype = require('./doctype')
handlers.comment = require('./comment')
handlers.raw = require('./raw')

function serialize(ctx, node, index, parent) {
  var type = node && node.type

  if (!type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`')
  }

  return handlers[type](ctx, node, index, parent)
}
