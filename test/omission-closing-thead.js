import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`thead` (closing)', async function (t) {
  await t.test('should not omit tag without siblings', async function () {
    assert.deepEqual(
      toHtml(h('thead'), {omitOptionalTags: true}),
      '<thead></thead>'
    )
  })

  await t.test('should not omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('table', h('thead')), {omitOptionalTags: true}),
      '<table><thead></thead></table>'
    )
  })

  await t.test('should omit tag followed by `tbody`', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('thead'), h('tbody')]), {omitOptionalTags: true}),
      '<table><thead><tbody></table>'
    )
  })

  await t.test('should omit tag followed by `tfoot`', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('thead'), h('tfoot')]), {omitOptionalTags: true}),
      '<table><thead><tfoot></table>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('thead'), h('tr')]), {omitOptionalTags: true}),
      '<table><thead></thead><tr></table>'
    )
  })
})
