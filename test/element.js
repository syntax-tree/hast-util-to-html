import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`element`', () => {
  assert.deepEqual(
    toHtml(h('i', 'bravo')),
    '<i>bravo</i>',
    'should serialize `element`s'
  )

  assert.deepEqual(
    toHtml(h('foo')),
    '<foo></foo>',
    'should serialize unknown `element`s'
  )

  assert.deepEqual(
    toHtml(h('img')),
    '<img>',
    'should serialize void `element`s'
  )

  assert.deepEqual(
    toHtml(h('foo'), {voids: ['foo']}),
    '<foo>',
    'should serialize given void `element`s'
  )

  assert.deepEqual(
    toHtml(h('img'), {closeSelfClosing: true}),
    '<img />',
    'should serialize with ` /` in `closeSelfClosing` mode'
  )

  assert.deepEqual(
    toHtml(h('img'), {closeSelfClosing: true, tightSelfClosing: true}),
    '<img/>',
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode'
  )

  assert.deepEqual(
    toHtml(h('input', {type: 'checkbox'}), {
      preferUnquoted: true,
      tightSelfClosing: true,
      closeSelfClosing: true
    }),
    '<input type=checkbox />',
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode, w/ space after an unquoted attribute (1)'
  )

  assert.deepEqual(
    toHtml(h('img', {src: 'index.jpg'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    '<img src=index.jpg />',
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode, w/ space after an unquoted attribute (2)'
  )

  assert.deepEqual(
    toHtml(h('img', {title: '/'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    '<img title=/ />',
    'should serialize voids with a ` /` in if an unquoted attribute ends with `/`'
  )

  assert.deepEqual(
    toHtml({
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
})
