/**
 * @import {Parents, Text} from 'hast'
 * @import {Raw} from 'mdast-util-to-hast'
 * @import {State} from '../index.js'
 */

import {stringifyEntities} from 'stringify-entities'

// Declare array as variable so it can be cached by `stringifyEntities`
const textEntitySubset = ['<', '&']

// Other elements whose text is serialized as-is, per the HTML serializing
// algorithm.
// Unlike `script` and `style`, text that would close the element is still
// encoded, so it cannot break out.
const rawTextElements = new Set([
  'iframe',
  'noembed',
  'noframes',
  'plaintext',
  'xmp'
])

/**
 * Serialize a text node.
 *
 * @param {Raw | Text} node
 *   Node to handle.
 * @param {number | undefined} _
 *   Index of `node` in `parent`.
 * @param {Parents | undefined} parent
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
export function text(node, _, parent, state) {
  // Check if content of `node` should be escaped.
  return parent &&
    parent.type === 'element' &&
    (parent.tagName === 'script' ||
      parent.tagName === 'style' ||
      (rawTextElements.has(parent.tagName) &&
        !node.value.toLowerCase().includes('</' + parent.tagName)))
    ? node.value
    : stringifyEntities(
        node.value,
        Object.assign({}, state.settings.characterReferences, {
          subset: textEntitySubset
        })
      )
}
