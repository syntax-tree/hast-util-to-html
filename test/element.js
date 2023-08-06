import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`element`', async function (t) {
  await t.test('should serialize `element`s', async function () {
    assert.deepEqual(toHtml(h('i', 'bravo')), '<i>bravo</i>')
  })

  await t.test('should serialize unknown `element`s', async function () {
    assert.deepEqual(toHtml(h('foo')), '<foo></foo>')
  })

  await t.test('should serialize void `element`s', async function () {
    assert.deepEqual(toHtml(h('img')), '<img>')
  })

  await t.test('should serialize given void `element`s', async function () {
    assert.deepEqual(toHtml(h('foo'), {voids: ['foo']}), '<foo>')
  })

  await t.test(
    'should serialize with ` /` in `closeSelfClosing` mode',
    async function () {
      assert.deepEqual(toHtml(h('img'), {closeSelfClosing: true}), '<img />')
    }
  )

  await t.test(
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode',
    async function () {
      assert.deepEqual(
        toHtml(h('img'), {closeSelfClosing: true, tightSelfClosing: true}),
        '<img/>'
      )
    }
  )

  await t.test(
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode, w/ space after an unquoted attribute (1)',
    async function () {
      assert.deepEqual(
        toHtml(h('input', {type: 'checkbox'}), {
          preferUnquoted: true,
          tightSelfClosing: true,
          closeSelfClosing: true
        }),
        '<input type=checkbox />'
      )
    }
  )

  await t.test(
    'should serialize voids with `/` in `closeSelfClosing` and `tightSelfClosing` mode, w/ space after an unquoted attribute (2)',
    async function () {
      assert.deepEqual(
        toHtml(h('img', {src: 'index.jpg'}), {
          preferUnquoted: true,
          closeSelfClosing: true,
          tightSelfClosing: true
        }),
        '<img src=index.jpg />'
      )
    }
  )

  await t.test(
    'should serialize voids with a ` /` in if an unquoted attribute ends with `/`',
    async function () {
      assert.deepEqual(
        toHtml(h('img', {title: '/'}), {
          preferUnquoted: true,
          closeSelfClosing: true,
          tightSelfClosing: true
        }),
        '<img title=/ />'
      )
    }
  )

  await t.test('should support `<template>`s content', async function () {
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
      '<template><p><b>Bold</b> and <i>italic</i>.</p></template>'
    )
  })
})
