import {isElement} from 'hast-util-is-element'
import {comment} from './util/comment.js'
import {siblingBefore, siblingAfter} from './util/siblings.js'
import {whitespaceStart} from './util/whitespace-start.js'
import {closing} from './closing.js'
import {omission} from './omission.js'

export const opening = omission({
  html,
  head,
  body,
  colgroup,
  tbody
})

// Whether to omit `<html>`.
function html(node) {
  var head = siblingAfter(node, -1)
  return !head || !comment(head)
}

// Whether to omit `<head>`.
function head(node) {
  var children = node.children
  var seen = []
  var index = -1

  while (++index < children.length) {
    if (isElement(children[index], ['title', 'base'])) {
      if (seen.includes(children[index].tagName)) return false
      seen.push(children[index].tagName)
    }
  }

  return children.length
}

// Whether to omit `<body>`.
function body(node) {
  var head = siblingAfter(node, -1, true)

  return (
    !head ||
    (!comment(head) &&
      !whitespaceStart(head) &&
      !isElement(head, ['meta', 'link', 'script', 'style', 'template']))
  )
}

// Whether to omit `<colgroup>`.
// The spec describes some logic for the opening tag, but it’s easier to
// implement in the closing tag, to the same effect, so we handle it there
// instead.
function colgroup(node, index, parent) {
  var previous = siblingBefore(parent, index)
  var head = siblingAfter(node, -1, true)

  // Previous colgroup was already omitted.
  if (
    isElement(previous, 'colgroup') &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && isElement(head, 'col')
}

// Whether to omit `<tbody>`.
function tbody(node, index, parent) {
  var previous = siblingBefore(parent, index)
  var head = siblingAfter(node, -1)

  // Previous table section was already omitted.
  if (
    isElement(previous, ['thead', 'tbody']) &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && isElement(head, 'tr')
}
