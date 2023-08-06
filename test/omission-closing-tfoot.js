import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`tfoot` (closing)', async function (t) {
  await t.test('should omit tag without siblings', async function () {
    assert.deepEqual(toHtml(h('tfoot'), {omitOptionalTags: true}), '<tfoot>')
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('table', h('tfoot')), {omitOptionalTags: true}),
      '<table><tfoot></table>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('tfoot'), h('tr')]), {omitOptionalTags: true}),
      '<table><tfoot></tfoot><tr></table>'
    )
  })
})
