import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tbody` (opening)', () => {
  assert.deepEqual(
    toHtml(h('tbody'), {omitOptionalTags: true}),
    '<tbody>',
    'should not omit tag without children'
  )

  assert.deepEqual(
    toHtml(h('tbody', h('tr')), {omitOptionalTags: true}),
    '<tr>',
    'should omit tag if head is `tr`'
  )

  assert.deepEqual(
    toHtml(h('table', [h('thead', h('tr')), h('tbody', h('tr'))]), {
      omitOptionalTags: true
    }),
    '<table><thead><tr><tbody><tr></table>',
    'should not omit tag preceded by an omitted `thead` closing tag'
  )

  assert.deepEqual(
    toHtml(h('table', [h('tbody', h('tr')), h('tbody', h('tr'))]), {
      omitOptionalTags: true
    }),
    '<table><tr><tbody><tr></table>',
    'should not omit tag preceded by an omitted `tbody` closing tag'
  )
})
