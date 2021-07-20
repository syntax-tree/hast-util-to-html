import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`tr` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('tr'), {omitOptionalTags: true}),
    '<tr>',
    'should omit tag without siblings'
  )

  t.deepEqual(
    toHtml(h('table', h('tr')), {omitOptionalTags: true}),
    '<table><tr></table>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('tr'), h('tbody')]), {omitOptionalTags: true}),
    '<table><tr></tr><tbody></table>',
    'should not omit tag followed by others'
  )

  t.end()
})
