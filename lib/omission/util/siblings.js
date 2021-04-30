import {whitespace} from 'hast-util-whitespace'

export const siblingAfter = siblings(1)
export const siblingBefore = siblings(-1)

// Factory to check siblings in a direction.
function siblings(increment) {
  return sibling

  // Find applicable siblings in a direction.
  function sibling(parent, index, includeWhitespace) {
    var siblings = parent && parent.children
    var offset = index + increment
    var next = siblings && siblings[offset]

    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment
        next = siblings[offset]
      }
    }

    return next
  }
}
