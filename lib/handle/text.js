/**
 * @typedef {import('../types.js').State} State
 * @typedef {import('../types.js').Parents} Parents
 * @typedef {import('../types.js').Raw} Raw
 * @typedef {import('../types.js').Text} Text
 */

import {stringifyEntities} from 'stringify-entities'

/**
 * Serialize a text node.
 *
 * @param {Text | Raw} node
 *   Node to handle.
 * @param {number | undefined} _
 *   Index of `node` in `parent.
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
    (parent.tagName === 'script' || parent.tagName === 'style')
    ? node.value
    : stringifyEntities(
        node.value,
        Object.assign({}, state.settings.characterReferences, {
          subset: ['<', '&']
        })
      )
}
