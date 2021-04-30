import {comment} from './comment.js'
import {doctype} from './doctype.js'
import {element} from './element.js'
import {raw} from './raw.js'
import {all} from './all.js'
import {text} from './text.js'

var handlers = {comment, doctype, element, raw, root: all, text}

var own = {}.hasOwnProperty

export function one(ctx, node, index, parent) {
  if (!node || !node.type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, node.type)) {
    throw new Error('Cannot compile unknown node `' + node.type + '`')
  }

  return handlers[node.type](ctx, node, index, parent)
}
