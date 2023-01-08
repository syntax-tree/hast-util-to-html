import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tbody` (closing)', () => {
  assert.deepEqual(
    toHtml(h('tbody'), {omitOptionalTags: true}),
    '<tbody>',
    'should omit tag without siblings'
  )

  assert.deepEqual(
    toHtml(h('table', h('tbody')), {omitOptionalTags: true}),
    '<table><tbody></table>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tbody'), h('tbody')]), {omitOptionalTags: true}),
    '<table><tbody><tbody></table>',
    'should omit tag followed by `tbody`'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tbody'), h('tfoot')]), {omitOptionalTags: true}),
    '<table><tbody><tfoot></table>',
    'should omit tag followed by `tfoot`'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tbody'), h('tr')]), {omitOptionalTags: true}),
    '<table><tbody></tbody><tr></table>',
    'should not omit tag followed by others'
  )
})
