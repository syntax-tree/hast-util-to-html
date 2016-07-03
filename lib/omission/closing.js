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
var is = require('unist-util-is');
var element = require('hast-util-is-element');
var whiteSpaceLeft = require('./util/white-space-left');
var after = require('./util/siblings').after;
var omission = require('./omission');

/* Construct. */
module.exports = omission({
  html: html,
  head: headOrColgroupOrCaption,
  body: body,
  p: p,
  li: li,
  dt: dt,
  dd: dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup: optgroup,
  option: option,
  menuitem: menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead: thead,
  tbody: tbody,
  tfoot: tfoot,
  tr: tr,
  td: cells,
  th: cells
});

/**
 * Macro for `</head>`, `</colgroup>`, and `</caption>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</head>` can be omitted.
 */
function headOrColgroupOrCaption(node, index, parent) {
  var next = after(parent, index, true);
  return !next || (!is('comment', next) && !whiteSpaceLeft(next));
}

/**
 * Whether to omit `</html>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</html>` can be omitted.
 */
function html(node, index, parent) {
  var next = after(parent, index);
  return !next || !is('comment', next);
}

/**
 * Whether to omit `</body>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</body>` can be omitted.
 */
function body(node, index, parent) {
  var next = after(parent, index);
  return !next || !is('comment', next);
}

/**
 * Whether to omit `</p>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</p>` can be omitted.
 */
function p(node, index, parent) {
  var next = after(parent, index);

  if (next) {
    return element(next, [
      'address', 'article', 'aside', 'blockquote', 'details',
      'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer',
      'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
      'hgroup', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre',
      'section', 'table', 'ul'
    ]);
  }

  return !parent || !element(parent, [
    'a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'
  ]);
}

/**
 * Whether to omit `</li>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</li>` can be omitted.
 */
function li(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, 'li');
}

/**
 * Whether to omit `</dt>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</dt>` can be omitted.
 */
function dt(node, index, parent) {
  var next = after(parent, index);
  return next && element(next, ['dt', 'dd']);
}

/**
 * Whether to omit `</dd>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</dd>` can be omitted.
 */
function dd(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['dt', 'dd']);
}

/**
 * Whether to omit `</rt>` or `</rp>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</rp>` or `rt` can be omitted.
 */
function rubyElement(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['rp', 'rt']);
}

/**
 * Whether to omit `</optgroup>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</optgroup>` can be omitted.
 */
function optgroup(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, 'optgroup');
}

/**
 * Whether to omit `</option>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</option>` can be omitted.
 */
function option(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['option', 'optgroup']);
}

/**
 * Whether to omit `</menuitem>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</menuitem>` can be omitted.
 */
function menuitem(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['menuitem', 'hr', 'menu']);
}

/**
 * Whether to omit `</thead>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</thead>` can be omitted.
 */
function thead(node, index, parent) {
  var next = after(parent, index);
  return next && element(next, ['tbody', 'tfoot']);
}

/**
 * Whether to omit `</tbody>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</tbody>` can be omitted.
 */
function tbody(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['tbody', 'tfoot']);
}

/**
 * Whether to omit `</tfoot>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</tfoot>` can be omitted.
 */
function tfoot(node, index, parent) {
  return !after(parent, index);
}

/**
 * Whether to omit `</tr>`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</tr>` can be omitted.
 */
function tr(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, 'tr');
}

/**
 * Whether to omit `</td>` or `th`.
 *
 * @param {HastElement} node - Node to check.
 * @param {number} [index] - Position of `node` in `parent`.
 * @param {HastParent} [parent] - Parent of `node`.
 * @return {boolean} - Whether `</td>` or `<th>` can be omitted.
 */
function cells(node, index, parent) {
  var next = after(parent, index);
  return !next || element(next, ['td', 'th']);
}
