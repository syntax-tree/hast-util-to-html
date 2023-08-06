import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`tr` (closing)', async function (t) {
  await t.test('should omit tag without siblings', async function () {
    assert.deepEqual(toHtml(h('tr'), {omitOptionalTags: true}), '<tr>')
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('table', h('tr')), {omitOptionalTags: true}),
      '<table><tr></table>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('table', [h('tr'), h('tbody')]), {omitOptionalTags: true}),
      '<table><tr></tr><tbody></table>'
    )
  })
})
