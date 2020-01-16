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
  var val = ['<!' + doc]

  if (name) {
    val.push(sep, name)

    if (pub !== null && pub !== undefined) {
      val.push(' public', sep, quote(ctx, pub))
    } else if (sys !== null && sys !== undefined) {
      val.push(' system')
    }

    if (sys !== null && sys !== undefined) {
      val.push(sep, quote(ctx, sys))
    }
  }

  return val.join('') + '>'
}

function quote(ctx, value) {
  var primary = ctx.quote
  var secondary = ctx.alternative
  var val = String(value)
  var quote =
    ccount(val, primary) > ccount(val, secondary) ? secondary : primary

  return (
    quote +
    // Prevent breaking out of doctype.
    entities(val, xtend(ctx.entities, {subset: ['<', '&', quote]})) +
    quote
  )
}
