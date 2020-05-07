'use strict'

var test = require('tape')
var h = require('hastscript')
var to = require('..')

test('`element`', function (t) {
  t.deepEqual(
    to(h('i', 'bravo')),
    '<i>bravo</i>',
    'should serialize `element`s'
  )

  t.deepEqual(
    to(h('foo')),
    '<foo></foo>',
    'should serialize unknown `element`s'
  )

  t.deepEqual(to(h('img')), '<img>', 'should serialize void `element`s')

  t.deepEqual(
    to(h('foo'), {voids: ['foo']}),
    '<foo>',
    'should serialize given void `element`s'
  )

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true}),
    '<img />',
    'should serialize with ` /` in `closeSelfClosing` mode'
  )

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true, tightSelfClosing: true}),
    '<img/>',
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode'
  )

  // This works in a browser.  The `/` is not part of the `[src]`.
  t.deepEqual(
    to(h('img', {src: 'index.jpg'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    '<img src=index.jpg/>',
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode, without space after an unquoted attribute'
  )

  t.deepEqual(
    to(h('img', {title: '/'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    '<img title=/ />',
    'should serialize voids with a ` /` in if an unquoted attribute ends with `/`'
  )

  t.deepEqual(
    to({
      type: 'element',
      tagName: 'template',
      properties: {},
      children: [],
      content: {
        type: 'root',
        children: [h('p', [h('b', 'Bold'), ' and ', h('i', 'italic'), '.'])]
      }
    }),
    '<template><p><b>Bold</b> and <i>italic</i>.</p></template>',
    'should support `<template>`s content'
  )

  t.end()
})
