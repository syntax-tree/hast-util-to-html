import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`colgroup` (opening)', async function (t) {
  await t.test('should not omit tag without children', async function () {
    assert.deepEqual(
      toHtml(h('colgroup'), {omitOptionalTags: true}),
      '<colgroup>'
    )
  })

  await t.test('should omit tag with `col` child', async function () {
    assert.deepEqual(
      toHtml(h('colgroup'), {omitOptionalTags: true}),
      '<colgroup>'
    )
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('table', h('colgroup')), {omitOptionalTags: true}),
      '<table><colgroup></table>'
    )
  })

  await t.test('should not omit tag followed by `comment`', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('colgroup'), u('comment', 'alpha')]), {
        omitOptionalTags: true
      }),
      '<table><colgroup></colgroup><!--alpha--></table>'
    )
  })

  await t.test('should not omit tag followed by whitespace', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('colgroup'), ' alpha']), {omitOptionalTags: true}),
      '<table><colgroup></colgroup> alpha</table>'
    )
  })

  await t.test('should omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('colgroup'), h('tr')]), {omitOptionalTags: true}),
      '<table><colgroup><tr></table>'
    )
  })
})
