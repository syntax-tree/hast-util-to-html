import {isElement} from 'hast-util-is-element'
import {comment} from './util/comment.js'
import {siblingAfter} from './util/siblings.js'
import {whitespaceStart} from './util/whitespace-start.js'
import {omission} from './omission.js'

export const closing = omission({
  html,
  head: headOrColgroupOrCaption,
  body,
  p,
  li,
  dt,
  dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup,
  option,
  menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead,
  tbody,
  tfoot,
  tr,
  td: cells,
  th: cells
})

// Macro for `</head>`, `</colgroup>`, and `</caption>`.
function headOrColgroupOrCaption(node, index, parent) {
  var next = siblingAfter(parent, index, true)
  return !next || (!comment(next) && !whitespaceStart(next))
}

// Whether to omit `</html>`.
function html(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || !comment(next)
}

// Whether to omit `</body>`.
function body(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || !comment(next)
}

// Whether to omit `</p>`.
function p(node, index, parent) {
  var next = siblingAfter(parent, index)
  return next
    ? isElement(next, [
        'address',
        'article',
        'aside',
        'blockquote',
        'details',
        'div',
        'dl',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'main',
        'menu',
        'nav',
        'ol',
        'p',
        'pre',
        'section',
        'table',
        'ul'
      ])
    : !parent ||
        // Confusing parent.
        !isElement(parent, [
          'a',
          'audio',
          'del',
          'ins',
          'map',
          'noscript',
          'video'
        ])
}

// Whether to omit `</li>`.
function li(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, 'li')
}

// Whether to omit `</dt>`.
function dt(node, index, parent) {
  var next = siblingAfter(parent, index)
  return next && isElement(next, ['dt', 'dd'])
}

// Whether to omit `</dd>`.
function dd(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['dt', 'dd'])
}

// Whether to omit `</rt>` or `</rp>`.
function rubyElement(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['rp', 'rt'])
}

// Whether to omit `</optgroup>`.
function optgroup(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, 'optgroup')
}

// Whether to omit `</option>`.
function option(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['option', 'optgroup'])
}

// Whether to omit `</menuitem>`.
function menuitem(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['menuitem', 'hr', 'menu'])
}

// Whether to omit `</thead>`.
function thead(node, index, parent) {
  var next = siblingAfter(parent, index)
  return next && isElement(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tbody>`.
function tbody(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tfoot>`.
function tfoot(node, index, parent) {
  return !siblingAfter(parent, index)
}

// Whether to omit `</tr>`.
function tr(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, 'tr')
}

// Whether to omit `</td>` or `</th>`.
function cells(node, index, parent) {
  var next = siblingAfter(parent, index)
  return !next || isElement(next, ['td', 'th'])
}
