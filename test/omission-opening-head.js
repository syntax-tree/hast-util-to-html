import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`head` (opening)', async function (t) {
  await t.test('should omit tag with children', async function () {
    assert.deepEqual(
      toHtml(h('head', h('meta', {charSet: 'utf8'})), {omitOptionalTags: true}),
      '<meta charset="utf8">'
    )
  })

  await t.test('should not omit tag without children', async function () {
    assert.deepEqual(toHtml(h('head'), {omitOptionalTags: true}), '<head>')
  })

  await t.test('should omit tag with `title`', async function () {
    assert.deepEqual(
      toHtml(h('head', h('title', 'alpha')), {omitOptionalTags: true}),
      '<title>alpha</title>'
    )
  })

  await t.test('should omit tag with `base`', async function () {
    assert.deepEqual(
      toHtml(h('head', h('base')), {omitOptionalTags: true}),
      '<base>'
    )
  })

  await t.test('should not omit tag with multiple `title`s', async function () {
    assert.deepEqual(
      toHtml(h('head', [h('title'), h('title')]), {omitOptionalTags: true}),
      '<head><title></title><title></title>'
    )
  })

  await t.test('should not omit tag with multiple `base`s', async function () {
    assert.deepEqual(
      toHtml(h('head', [h('base'), h('base')]), {omitOptionalTags: true}),
      '<head><base><base>'
    )
  })
})
