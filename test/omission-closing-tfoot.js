import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tfoot` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('tfoot'), {omitOptionalTags: true}),
    '<tfoot>',
    'should omit tag without siblings'
  )

  t.deepEqual(
    toHtml(h('table', h('tfoot')), {omitOptionalTags: true}),
    '<table><tfoot></table>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('tfoot'), h('tr')]), {omitOptionalTags: true}),
    '<table><tfoot></tfoot><tr></table>',
    'should not omit tag followed by others'
  )

  t.end()
})
