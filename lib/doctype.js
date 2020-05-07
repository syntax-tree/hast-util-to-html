'use strict'

var xtend = require('xtend')
var ccount = require('ccount')
var entities = require('stringify-entities')

module.exports = serializeDoctype

var docLower = 'doctype'
var docUpper = docLower.toUpperCase()

function serializeDoctype(ctx, node) {
  var doc = ctx.upperDoctype ? docUpper : docLower
  var sep = ctx.tightDoctype ? '' : ' '
  var name = node.name
  var pub = node.public
  var sys = node.system
  var parts = ['<!' + doc]

  if (name) {
    parts.push(sep, name)

    if (pub !== null && pub !== undefined) {
      parts.push(' public', sep, quote(ctx, pub))
    } else if (sys !== null && sys !== undefined) {
      parts.push(' system')
    }

    if (sys !== null && sys !== undefined) {
      parts.push(sep, quote(ctx, sys))
    }
  }

  return parts.join('') + '>'
}

function quote(ctx, value) {
  var primary = ctx.quote
  var secondary = ctx.alternative
  var string = String(value)
  var quote =
    ccount(string, primary) > ccount(string, secondary) ? secondary : primary

  return (
    quote +
    // Prevent breaking out of doctype.
    entities(string, xtend(ctx.entities, {subset: ['<', '&', quote]})) +
    quote
  )
}
