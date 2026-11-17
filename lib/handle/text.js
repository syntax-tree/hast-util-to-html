/**
 * @import {Element, Parents, Text} from 'hast'
 * @import {Raw} from 'mdast-util-to-hast'
 * @import {State} from '../index.js'
 */

import {stringifyEntities} from 'stringify-entities'

// Declare array as variable so it can be cached by `stringifyEntities`
const textEntitySubset = ['<', '&']

// Other elements whose text is serialized as-is, per the HTML serializing
// algorithm.
// Unlike `script` and `style`, their text is still encoded when it could close
// the element, so it cannot break out.
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
      (rawTextElements.has(parent.tagName) && isSafeRawText(parent)))
    ? node.value
    : stringifyEntities(
        node.value,
        Object.assign({}, state.settings.characterReferences, {
          subset: textEntitySubset
        })
      )
}

/**
 * Check if the content of a raw text element can be serialized as-is: it
 * contains only text, and that text does not close the element.
 *
 * @param {Element} parent
 *   Raw text element.
 * @returns {boolean}
 *   Whether the content is safe.
 */
function isSafeRawText(parent) {
  let value = ''
  let index = -1

  while (++index < parent.children.length) {
    const child = parent.children[index]
    if (child.type !== 'text') return false
    value += child.value
  }

  return !value.toLowerCase().includes('</' + parent.tagName)
}
