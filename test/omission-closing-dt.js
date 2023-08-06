import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`dt` (closing)', async function (t) {
  await t.test('should not omit tag without parent', async function () {
    assert.deepEqual(toHtml(h('dt'), {omitOptionalTags: true}), '<dt></dt>')
  })

  await t.test('should not omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('dl', h('dt')), {omitOptionalTags: true}),
      '<dl><dt></dt></dl>'
    )
  })

  await t.test('should omit tag followed by `dt`', async function () {
    assert.deepEqual(
      toHtml(h('dl', [h('dt'), h('dt')]), {omitOptionalTags: true}),
      '<dl><dt><dt></dt></dl>'
    )
  })

  await t.test('should omit tag followed by `dd`', async function () {
    assert.deepEqual(
      toHtml(h('dl', [h('dt'), h('dd')]), {omitOptionalTags: true}),
      '<dl><dt><dd></dl>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('dl', [h('dt'), h('p')]), {omitOptionalTags: true}),
      '<dl><dt></dt><p></dl>'
    )
  })
})
