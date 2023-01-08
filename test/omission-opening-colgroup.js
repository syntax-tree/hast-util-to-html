import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`colgroup` (opening)', () => {
  assert.deepEqual(
    toHtml(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should not omit tag without children'
  )

  assert.deepEqual(
    toHtml(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should omit tag with `col` child'
  )

  assert.deepEqual(
    toHtml(h('table', h('colgroup')), {omitOptionalTags: true}),
    '<table><colgroup></table>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('table', [h('colgroup'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<table><colgroup></colgroup><!--alpha--></table>',
    'should not omit tag followed by `comment`'
  )

  assert.deepEqual(
    toHtml(h('table', [h('colgroup'), ' alpha']), {omitOptionalTags: true}),
    '<table><colgroup></colgroup> alpha</table>',
    'should not omit tag followed by whitespace'
  )

  assert.deepEqual(
    toHtml(h('table', [h('colgroup'), h('tr')]), {omitOptionalTags: true}),
    '<table><colgroup><tr></table>',
    'should omit tag followed by others'
  )
})
