import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tbody` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('tbody'), {omitOptionalTags: true}),
    '<tbody>',
    'should omit tag without siblings'
  )

  t.deepEqual(
    toHtml(h('table', h('tbody')), {omitOptionalTags: true}),
    '<table><tbody></table>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('tbody'), h('tbody')]), {omitOptionalTags: true}),
    '<table><tbody><tbody></table>',
    'should omit tag followed by `tbody`'
  )

  t.deepEqual(
    toHtml(h('table', [h('tbody'), h('tfoot')]), {omitOptionalTags: true}),
    '<table><tbody><tfoot></table>',
    'should omit tag followed by `tfoot`'
  )

  t.deepEqual(
    toHtml(h('table', [h('tbody'), h('tr')]), {omitOptionalTags: true}),
    '<table><tbody></tbody><tr></table>',
    'should not omit tag followed by others'
  )

  t.end()
})
