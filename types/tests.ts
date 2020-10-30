import toHtml = require('hast-util-to-html')
import {Node} from 'unist'

const node: Node = {
  type: 'element',
  tagName: 'div'
}

const result: string = toHtml(node)

toHtml(node, {
  space: 'html'
})
toHtml(node, {
  space: 'svg'
})
toHtml(node, {
  space: 'svg'
})
toHtml(node, {entities: {useNamedReferences: true}})
// $ExpectError
toHtml(node, {entities: {escapeOnly: true}})
// $ExpectError
toHtml(node, {entities: {attribute: true}})
// $ExpectError
toHtml(node, {entities: {subset: ['subset']}})
toHtml(node, {
  voids: ['hr']
})
toHtml(node, {
  upperDoctype: true
})
toHtml(node, {
  quote: "'"
})
toHtml(node, {
  quoteSmart: true
})
toHtml(node, {
  preferUnquoted: true
})
toHtml(node, {
  omitOptionalTags: true
})
toHtml(node, {
  collapseEmptyAttributes: true
})
toHtml(node, {
  closeSelfClosing: true
})
toHtml(node, {
  closeEmptyElements: true
})
toHtml(node, {
  tightSelfClosing: true
})
toHtml(node, {
  tightCommaSeparatedLists: true
})
toHtml(node, {
  tightAttributes: true
})
toHtml(node, {
  tightDoctype: true
})
toHtml(node, {
  allowParseErrors: true
})
toHtml(node, {
  allowDangerousCharacters: true
})
toHtml(node, {
  allowDangerousHtml: true
})
