/**
 * @typedef {import('./types.js').Handle} Handle
 * @typedef {import('./types.js').Parent} Parent
 */
import {one} from './one.js'

/**
 * Serialize all children of `parent`.
 *
 * @type {Handle}
 * @param {Parent} parent
 */
export function all(ctx, parent) {
  /** @type {Array.<string>} */
  var results = []
  var children = (parent && parent.children) || []
  var index = -1

  while (++index < children.length) {
    results[index] = one(ctx, children[index], index, parent)
  }

  return results.join('')
}
