import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`dt` (closing)', () => {
  assert.deepEqual(
    toHtml(h('dt'), {omitOptionalTags: true}),
    '<dt></dt>',
    'should not omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('dl', h('dt')), {omitOptionalTags: true}),
    '<dl><dt></dt></dl>',
    'should not omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dt'), h('dt')]), {omitOptionalTags: true}),
    '<dl><dt><dt></dt></dl>',
    'should omit tag followed by `dt`'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dt'), h('dd')]), {omitOptionalTags: true}),
    '<dl><dt><dd></dl>',
    'should omit tag followed by `dd`'
  )

  assert.deepEqual(
    toHtml(h('dl', [h('dt'), h('p')]), {omitOptionalTags: true}),
    '<dl><dt></dt><p></dl>',
    'should not omit tag followed by others'
  )
})
