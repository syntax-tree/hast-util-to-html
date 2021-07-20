import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`thead` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('thead'), {omitOptionalTags: true}),
    '<thead></thead>',
    'should not omit tag without siblings'
  )

  t.deepEqual(
    toHtml(h('table', h('thead')), {omitOptionalTags: true}),
    '<table><thead></thead></table>',
    'should not omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('thead'), h('tbody')]), {omitOptionalTags: true}),
    '<table><thead><tbody></table>',
    'should omit tag followed by `tbody`'
  )

  t.deepEqual(
    toHtml(h('table', [h('thead'), h('tfoot')]), {omitOptionalTags: true}),
    '<table><thead><tfoot></table>',
    'should omit tag followed by `tfoot`'
  )

  t.deepEqual(
    toHtml(h('table', [h('thead'), h('tr')]), {omitOptionalTags: true}),
    '<table><thead></thead><tr></table>',
    'should not omit tag followed by others'
  )

  t.end()
})
