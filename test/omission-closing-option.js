import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`option` (closing)', () => {
  assert.deepEqual(
    toHtml(h('option'), {omitOptionalTags: true}),
    '<option>',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('select', h('option')), {omitOptionalTags: true}),
    '<select><option></select>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('select', [h('option'), h('option')]), {omitOptionalTags: true}),
    '<select><option><option></select>',
    'should omit tag followed by `option`'
  )

  assert.deepEqual(
    toHtml(h('select', [h('option'), h('optgroup')]), {omitOptionalTags: true}),
    '<select><option><optgroup></select>',
    'should omit tag followed by `optgroup`'
  )

  assert.deepEqual(
    toHtml(h('select', [h('option'), h('p')]), {omitOptionalTags: true}),
    '<select><option></option><p></select>',
    'should not omit tag followed by others'
  )
})
