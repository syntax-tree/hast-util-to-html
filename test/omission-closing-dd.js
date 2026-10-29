import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`dd` (closing)', async function (t) {
  await t.test('should omit tag without parent', async function () {
    assert.equal(toHtml(h('dd'), {omitOptionalTags: true}), '<dd>')
  })

  await t.test('should omit tag without following', async function () {
    assert.equal(
      toHtml(h('dl', h('dd')), {omitOptionalTags: true}),
      '<dl><dd></dl>'
    )
  })

  await t.test('should omit tag followed by `dd`', async function () {
    assert.equal(
      toHtml(h('dl', [h('dd'), h('dd')]), {omitOptionalTags: true}),
      '<dl><dd><dd></dl>'
    )
  })

  await t.test('should omit tag followed by `dt`', async function () {
    assert.equal(
      toHtml(h('dl', [h('dd'), h('dt')]), {omitOptionalTags: true}),
      '<dl><dd><dt></dt></dl>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.equal(
      toHtml(h('dl', [h('dd'), h('p')]), {omitOptionalTags: true}),
      '<dl><dd></dd><p></dl>'
    )
  })
})
