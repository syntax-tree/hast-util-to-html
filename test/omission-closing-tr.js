import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tr` (closing)', () => {
  assert.deepEqual(
    toHtml(h('tr'), {omitOptionalTags: true}),
    '<tr>',
    'should omit tag without siblings'
  )

  assert.deepEqual(
    toHtml(h('table', h('tr')), {omitOptionalTags: true}),
    '<table><tr></table>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tr'), h('tbody')]), {omitOptionalTags: true}),
    '<table><tr></tr><tbody></table>',
    'should not omit tag followed by others'
  )
})
