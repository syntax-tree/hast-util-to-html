import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`tbody` (closing)', async function (t) {
  await t.test('should omit tag without siblings', async function () {
    assert.deepEqual(toHtml(h('tbody'), {omitOptionalTags: true}), '<tbody>')
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('table', h('tbody')), {omitOptionalTags: true}),
      '<table><tbody></table>'
    )
  })

  await t.test('should omit tag followed by `tbody`', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('tbody'), h('tbody')]), {omitOptionalTags: true}),
      '<table><tbody><tbody></table>'
    )
  })

  await t.test('should omit tag followed by `tfoot`', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('tbody'), h('tfoot')]), {omitOptionalTags: true}),
      '<table><tbody><tfoot></table>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('tbody'), h('tr')]), {omitOptionalTags: true}),
      '<table><tbody></tbody><tr></table>'
    )
  })
})
