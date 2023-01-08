/**
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').Content} Content
 * @typedef {import('./types.js').Options} Options
 * @typedef {import('./types.js').Settings} Settings
 * @typedef {import('./types.js').State} State
 * @typedef {import('./types.js').Quote} Quote
 */

import {html, svg} from 'property-information'
import {htmlVoidElements} from 'html-void-elements'
import {handle} from './handle/index.js'

/**
 * @param {Node | Array<Content>} node
 * @param {Options} [options]
 * @returns {string}
 */
// eslint-disable-next-line complexity
export function toHtml(node, options = {}) {
  const quote = options.quote || '"'
  const alternative = quote === '"' ? "'" : '"'

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  /** @type {State} */
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options.omitOptionalTags || false,
      allowParseErrors: options.allowParseErrors || false,
      allowDangerousCharacters: options.allowDangerousCharacters || false,
      quoteSmart: options.quoteSmart || false,
      preferUnquoted: options.preferUnquoted || false,
      tightAttributes: options.tightAttributes || false,
      upperDoctype: options.upperDoctype || false,
      tightDoctype: options.tightDoctype || false,
      bogusComments: options.bogusComments || false,
      tightCommaSeparatedLists: options.tightCommaSeparatedLists || false,
      tightSelfClosing: options.tightSelfClosing || false,
      collapseEmptyAttributes: options.collapseEmptyAttributes || false,
      allowDangerousHtml: options.allowDangerousHtml || false,
      voids: options.voids || htmlVoidElements,
      characterReferences:
        options.characterReferences || options.entities || {},
      closeSelfClosing: options.closeSelfClosing || false,
      closeEmptyElements: options.closeEmptyElements || false
    },
    schema: options.space === 'svg' ? svg : html,
    quote,
    alternative
  }

  return state.one(
    Array.isArray(node) ? {type: 'root', children: node} : node,
    undefined,
    undefined
  )
}

/**
 * Serialize a node.
 *
 * @this {State}
 *   Info passed around about the current state.
 * @param {Node} node
 *   Node to handle.
 * @param {number | undefined} index
 *   Index of `node` in `parent.
 * @param {Parent | undefined} parent
 *   Parent of `node`.
 * @returns {string}
 *   Serialized node.
 */
function one(node, index, parent) {
  return handle(node, index, parent, this)
}

/**
 * Serialize all children of `parent`.
 *
 * @this {State}
 *   Info passed around about the current state.
 * @param {Parent | undefined} parent
 *   Parent whose children to serialize.
 * @returns {string}
 */
export function all(parent) {
  /** @type {Array<string>} */
  const results = []
  const children = (parent && parent.children) || []
  let index = -1

  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent)
  }

  return results.join('')
}
