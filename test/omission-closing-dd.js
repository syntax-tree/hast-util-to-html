import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`dd` (closing)', () => {
  assert.deepEqual(
    toHtml(h('dd'), {omitOptionalTags: true}),
    '<dd>',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('dl', h('dd')), {omitOptionalTags: true}),
    '<dl><dd></dl>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dd'), h('dd')]), {omitOptionalTags: true}),
    '<dl><dd><dd></dl>',
    'should omit tag followed by `dd`'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dd'), h('dt')]), {omitOptionalTags: true}),
    '<dl><dd><dt></dt></dl>',
    'should omit tag followed by `dt`'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dd'), h('p')]), {omitOptionalTags: true}),
    '<dl><dd></dd><p></dl>',
    'should not omit tag followed by others'
  )
})
