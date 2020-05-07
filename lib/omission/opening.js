'use strict'

var convert = require('unist-util-is/convert')
var element = require('hast-util-is-element')
var before = require('./util/siblings').before
var first = require('./util/first')
var place = require('./util/place')
var whiteSpaceStart = require('./util/white-space-start')
var closing = require('./closing')
var omission = require('./omission')

var isComment = convert('comment')

var uniqueHeadMetadata = ['title', 'base']
var meta = ['meta', 'link', 'script', 'style', 'template']
var tableContainers = ['thead', 'tbody']
var tableRow = 'tr'

module.exports = omission({
  html: html,
  head: head,
  body: body,
  colgroup: colgroup,
  tbody: tbody
})

// Whether to omit `<html>`.
function html(node) {
  var head = first(node)
  return !head || !isComment(head)
}

// Whether to omit `<head>`.
function head(node) {
  var children = node.children
  var length = children.length
  var seen = []
  var index = -1
  var child
  var name

  while (++index < length) {
    child = children[index]
    name = child.tagName

    if (element(child, uniqueHeadMetadata)) {
      if (seen.indexOf(name) !== -1) {
        return false
      }

      seen.push(name)
    }
  }

  return length !== 0
}

// Whether to omit `<body>`.
function body(node) {
  var head = first(node, true)

  return (
    !head ||
    (!isComment(head) && !whiteSpaceStart(head) && !element(head, meta))
  )
}

// Whether to omit `<colgroup>`.
// The spec describes some logic for the opening tag, but it’s easier to
// implement in the closing tag, to the same effect, so we handle it there
// instead.
function colgroup(node, index, parent) {
  var previous = before(parent, index)
  var head = first(node, true)

  // Previous colgroup was already omitted.
  if (
    element(previous, 'colgroup') &&
    closing(previous, place(parent, previous), parent)
  ) {
    return false
  }

  return head && element(head, 'col')
}

// Whether to omit `<tbody>`.
function tbody(node, index, parent) {
  var previous = before(parent, index)
  var head = first(node)

  // Previous table section was already omitted.
  if (
    element(previous, tableContainers) &&
    closing(previous, place(parent, previous), parent)
  ) {
    return false
  }

  return head && element(head, tableRow)
}
