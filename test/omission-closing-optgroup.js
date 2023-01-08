import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`optgroup` (closing)', () => {
  assert.deepEqual(
    toHtml(h('optgroup'), {omitOptionalTags: true}),
    '<optgroup>',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('select', h('optgroup')), {omitOptionalTags: true}),
    '<select><optgroup></select>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('select', [h('optgroup'), h('optgroup')]), {
      omitOptionalTags: true
    }),
    '<select><optgroup><optgroup></select>',
    'should omit tag followed by `optgroup`'
  )

  assert.deepEqual(
    toHtml(h('select', [h('optgroup'), h('p')]), {omitOptionalTags: true}),
    '<select><optgroup></optgroup><p></select>',
    'should not omit tag followed by others'
  )
})
