import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`li` (closing)', async function (t) {
  await t.test('should omit tag without parent', async function () {
    assert.deepEqual(toHtml(h('li'), {omitOptionalTags: true}), '<li>')
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('ol', h('li')), {omitOptionalTags: true}),
      '<ol><li></ol>'
    )
  })

  await t.test('should omit tag followed by `li`', async function () {
    assert.deepEqual(
      toHtml(h('ol', [h('li'), h('li')]), {omitOptionalTags: true}),
      '<ol><li><li></ol>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('ol', [h('li'), h('p')]), {omitOptionalTags: true}),
      '<ol><li></li><p></ol>'
    )
  })
})
