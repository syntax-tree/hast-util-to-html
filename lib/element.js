/**
 * @typedef {import('./types.js').Handle} Handle
 * @typedef {import('./types.js').Element} Element
 * @typedef {import('./types.js').Context} Context
 * @typedef {import('./types.js').Properties} Properties
 * @typedef {import('./types.js').PropertyValue} PropertyValue
 */

import {svg, find} from 'property-information'
import {stringify as spaces} from 'space-separated-tokens'
import {stringify as commas} from 'comma-separated-tokens'
import {stringifyEntities} from 'stringify-entities'
import {ccount} from 'ccount'
import {all} from './all.js'
import {constants} from './constants.js'

/**
 * @type {Handle}
 * @param {Element} node
 */
// eslint-disable-next-line complexity
export function element(ctx, node, index, parent) {
  var schema = ctx.schema
  var omit = schema.space === 'svg' ? undefined : ctx.omit
  var selfClosing =
    schema.space === 'svg'
      ? ctx.closeEmpty
      : ctx.voids.includes(node.tagName.toLowerCase())
  /** @type {Array.<string>} */
  var parts = []
  /** @type {string} */
  var attrs
  /** @type {string} */
  var content
  /** @type {string} */
  var last

  if (schema.space === 'html' && node.tagName === 'svg') {
    ctx.schema = svg
  }

  attrs = serializeAttributes(ctx, node.properties)

  content = all(
    ctx,
    schema.space === 'html' && node.tagName === 'template' ? node.content : node
  )

  ctx.schema = schema

  // If the node is categorised as void, but it has children, remove the
  // categorisation.
  // This enables for example `menuitem`s, which are void in W3C HTML but not
  // void in WHATWG HTML, to be stringified properly.
  if (content) selfClosing = false

  if (attrs || !omit || !omit.opening(node, index, parent)) {
    parts.push('<', node.tagName, attrs ? ' ' + attrs : '')

    if (selfClosing && (schema.space === 'svg' || ctx.close)) {
      last = attrs.charAt(attrs.length - 1)
      if (
        !ctx.tightClose ||
        last === '/' ||
        (schema.space === 'svg' && last && last !== '"' && last !== "'")
      ) {
        parts.push(' ')
      }

      parts.push('/')
    }

    parts.push('>')
  }

  parts.push(content)

  if (!selfClosing && (!omit || !omit.closing(node, index, parent))) {
    parts.push('</' + node.tagName + '>')
  }

  return parts.join('')
}

/**
 * @param {Context} ctx
 * @param {Properties} props
 * @returns {string}
 */
function serializeAttributes(ctx, props) {
  /** @type {Array.<string>} */
  var values = []
  var index = -1
  /** @type {string} */
  var key
  /** @type {string} */
  var value
  /** @type {string} */
  var last

  for (key in props) {
    if (props[key] !== undefined && props[key] !== null) {
      value = serializeAttribute(ctx, key, props[key])
      if (value) values.push(value)
    }
  }

  while (++index < values.length) {
    last = ctx.tight ? values[index].charAt(values[index].length - 1) : null

    // In tight mode, don’t add a space after quoted attributes.
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += ' '
    }
  }

  return values.join('')
}

/**
 * @param {Context} ctx
 * @param {string} key
 * @param {PropertyValue} value
 * @returns {string}
 */
// eslint-disable-next-line complexity
function serializeAttribute(ctx, key, value) {
  var info = find(ctx.schema, key)
  var quote = ctx.quote
  /** @type {string} */
  var result
  /** @type {string} */
  var name

  if (info.overloadedBoolean && (value === info.attribute || value === '')) {
    value = true
  } else if (
    info.boolean ||
    (info.overloadedBoolean && typeof value !== 'string')
  ) {
    value = Boolean(value)
  }

  if (
    value === undefined ||
    value === null ||
    value === false ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return ''
  }

  name = stringifyEntities(
    info.attribute,
    Object.assign({}, ctx.entities, {
      // Always encode without parse errors in non-HTML.
      subset:
        constants.name[ctx.schema.space === 'html' ? ctx.valid : 1][ctx.safe]
    })
  )

  // No value.
  // There is currently only one boolean property in SVG: `[download]` on
  // `<a>`.
  // This property does not seem to work in browsers (FF, Sa, Ch), so I can’t
  // test if dropping the value works.
  // But I assume that it should:
  //
  // ```html
  // <!doctype html>
  // <svg viewBox="0 0 100 100">
  //   <a href=https://example.com download>
  //     <circle cx=50 cy=40 r=35 />
  //   </a>
  // </svg>
  // ```
  //
  // See: <https://github.com/wooorm/property-information/blob/main/lib/svg.js>
  if (value === true) return name

  value =
    typeof value === 'object' && 'length' in value
      ? // `spaces` doesn’t accept a second argument, but it’s given here just to
        // keep the code cleaner.
        (info.commaSeparated ? commas : spaces)(value, {
          padLeft: !ctx.tightLists
        })
      : String(value)

  if (ctx.collapseEmpty && !value) return name

  // Check unquoted value.
  if (ctx.unquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, ctx.entities, {
        subset: constants.unquoted[ctx.valid][ctx.safe],
        attribute: true
      })
    )
  }

  // If we don’t want unquoted, or if `value` contains character references when
  // unquoted…
  if (result !== value) {
    // If the alternative is less common than `quote`, switch.
    if (ctx.smart && ccount(value, quote) > ccount(value, ctx.alternative)) {
      quote = ctx.alternative
    }

    result =
      quote +
      stringifyEntities(
        value,
        Object.assign({}, ctx.entities, {
          // Always encode without parse errors in non-HTML.
          subset: (quote === "'" ? constants.single : constants.double)[
            ctx.schema.space === 'html' ? ctx.valid : 1
          ][ctx.safe],
          attribute: true
        })
      ) +
      quote
  }

  // Don’t add a `=` for unquoted empties.
  return name + (result ? '=' + result : result)
}
