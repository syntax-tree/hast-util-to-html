import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`optgroup` (closing)', async function (t) {
  await t.test('should omit tag without parent', async function () {
    assert.deepEqual(
      toHtml(h('optgroup'), {omitOptionalTags: true}),
      '<optgroup>'
    )
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('select', h('optgroup')), {omitOptionalTags: true}),
      '<select><optgroup></select>'
    )
  })

  await t.test('should omit tag followed by `optgroup`', async function () {
    assert.deepEqual(
      toHtml(h('select', [h('optgroup'), h('optgroup')]), {
        omitOptionalTags: true
      }),
      '<select><optgroup><optgroup></select>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('select', [h('optgroup'), h('p')]), {omitOptionalTags: true}),
      '<select><optgroup></optgroup><p></select>'
    )
  })
})
