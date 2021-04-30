import {one} from './one.js'

// Serialize all children of `parent`.
export function all(ctx, parent) {
  var results = []
  var children = (parent && parent.children) || []
  var index = -1

  while (++index < children.length) {
    results[index] = one(ctx, children[index], index, parent)
  }

  return results.join('')
}
