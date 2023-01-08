import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`li` (closing)', () => {
  assert.deepEqual(
    toHtml(h('li'), {omitOptionalTags: true}),
    '<li>',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('ol', h('li')), {omitOptionalTags: true}),
    '<ol><li></ol>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('ol', [h('li'), h('li')]), {omitOptionalTags: true}),
    '<ol><li><li></ol>',
    'should omit tag followed by `li`'
  )

  assert.deepEqual(
    toHtml(h('ol', [h('li'), h('p')]), {omitOptionalTags: true}),
    '<ol><li></li><p></ol>',
    'should not omit tag followed by others'
  )
})
