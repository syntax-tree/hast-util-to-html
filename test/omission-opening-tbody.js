import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tbody` (opening)', (t) => {
  t.deepEqual(
    toHtml(h('tbody'), {omitOptionalTags: true}),
    '<tbody>',
    'should not omit tag without children'
  )

  t.deepEqual(
    toHtml(h('tbody', h('tr')), {omitOptionalTags: true}),
    '<tr>',
    'should omit tag if head is `tr`'
  )

  t.deepEqual(
    toHtml(h('table', [h('thead', h('tr')), h('tbody', h('tr'))]), {
      omitOptionalTags: true
    }),
    '<table><thead><tr><tbody><tr></table>',
    'should not omit tag preceded by an omitted `thead` closing tag'
  )

  t.deepEqual(
    toHtml(h('table', [h('tbody', h('tr')), h('tbody', h('tr'))]), {
      omitOptionalTags: true
    }),
    '<table><tr><tbody><tr></table>',
    'should not omit tag preceded by an omitted `tbody` closing tag'
  )

  t.end()
})
