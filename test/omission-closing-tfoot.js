import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tfoot` (closing)', () => {
  assert.deepEqual(
    toHtml(h('tfoot'), {omitOptionalTags: true}),
    '<tfoot>',
    'should omit tag without siblings'
  )

  assert.deepEqual(
    toHtml(h('table', h('tfoot')), {omitOptionalTags: true}),
    '<table><tfoot></table>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tfoot'), h('tr')]), {omitOptionalTags: true}),
    '<table><tfoot></tfoot><tr></table>',
    'should not omit tag followed by others'
  )
})
