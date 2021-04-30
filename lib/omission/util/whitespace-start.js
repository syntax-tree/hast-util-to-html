import {convert} from 'unist-util-is'
import {whitespace} from 'hast-util-whitespace'

var isText = convert('text')

// Check if `node` starts with whitespace.
export function whitespaceStart(node) {
  return isText(node) && whitespace(node.value.charAt(0))
}
