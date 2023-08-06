import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`option` (closing)', async function (t) {
  await t.test('should omit tag without parent', async function () {
    assert.deepEqual(toHtml(h('option'), {omitOptionalTags: true}), '<option>')
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('select', h('option')), {omitOptionalTags: true}),
      '<select><option></select>'
    )
  })

  await t.test('should omit tag followed by `option`', async function () {
    assert.deepEqual(
      toHtml(h('select', [h('option'), h('option')]), {omitOptionalTags: true}),
      '<select><option><option></select>'
    )
  })

  await t.test('should omit tag followed by `optgroup`', async function () {
    assert.deepEqual(
      toHtml(h('select', [h('option'), h('optgroup')]), {
        omitOptionalTags: true
      }),
      '<select><option><optgroup></select>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('select', [h('option'), h('p')]), {omitOptionalTags: true}),
      '<select><option></option><p></select>'
    )
  })
})
