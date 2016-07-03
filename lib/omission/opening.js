/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:to-html:omission
 * @fileoverview Check if a tag can be omitted.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var has = require('has');
var is = require('unist-util-is');
var element = require('hast-util-is-element');
var before = require('./util/siblings').before;
var first = require('./util/first');
var place = require('./util/place');
var whiteSpaceLeft = require('./util/white-space-left');
var closing = require('./closing');
var omission = require('./omission');

/* Construct. */
module.exports = omission({
  html: html,
  head: head,
  body: body,
  colgroup: colgroup,
  tbody: tbody
});

/**
 * Whether to omit `<html>`.
 *
 * @param {HastElement} node - Node to check.
 * @return {boolean} - Whether `<html>` can be omitted.
 */
function html(node) {
  var head = first(node);
  return !head || !is('comment', head);
}

/**
 * Omit `<head>`.
 *
 * @param {HastElement} node - Node to check.
 * @return {boolean} - Whether `<head>` can be omitted.
 */
function head(node) {
  var children = node.children;
  var length = children.length;
  var map = {};
  var index = -1;
  var child;
  var name;

  while (++index < length) {
    child = children[index];
    name = child.tagName;

    if (
      child.type === 'element' &&
      (name === 'title' || name === 'base')
    ) {
      if (has(map, name)) {
        return false;
      }

      map[name] = true;
    }
  }

  return Boolean(length);
}

/**
 * Whether to omit `<body>`.
 *
 * @param {HastElement} node - Node to check.
 * @return {boolean} - Whether `<body>` can be omitted.
 */
function body(node) {
  var head = first(node, true);

  return !head || (
    !is('comment', head) &&
    !whiteSpaceLeft(head) &&
    !element(head, ['meta', 'link', 'script', 'style', 'template'])
  );
}

/**
 * Whether to omit `<colgroup>`.
 * The spec describes some logic for the opening tag,
 * but it’s easier to implement in the closing tag, to
 * the same effect, so we handle it there instead.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `<colgroup>` can be omitted.
 */
function colgroup(node, index, parent) {
  var prev = before(parent, index);
  var head = first(node, true);

  /* Previous colgroup was already omitted. */
  if (
    element(prev, 'colgroup') &&
    closing(prev, place(parent, prev), parent)
  ) {
    return false;
  }

  return head && element(head, 'col');
}

/**
 * Whether to omit `<tbody>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `<tbody>` can be omitted.
 */
function tbody(node, index, parent) {
  var prev = before(parent, index);
  var head = first(node);

  /* Previous table section was already omitted. */
  if (
    element(prev, ['thead', 'tbody']) &&
    closing(prev, place(parent, prev), parent)
  ) {
    return false;
  }

  return head && element(head, 'tr');
}
