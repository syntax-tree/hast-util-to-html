import test from 'tape'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`colgroup` (opening)', (t) => {
  t.deepEqual(
    toHtml(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should not omit tag without children'
  )

  t.deepEqual(
    toHtml(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should omit tag with `col` child'
  )

  t.deepEqual(
    toHtml(h('table', h('colgroup')), {omitOptionalTags: true}),
    '<table><colgroup></table>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('colgroup'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<table><colgroup></colgroup><!--alpha--></table>',
    'should not omit tag followed by `comment`'
  )

  t.deepEqual(
    toHtml(h('table', [h('colgroup'), ' alpha']), {omitOptionalTags: true}),
    '<table><colgroup></colgroup> alpha</table>',
    'should not omit tag followed by whitespace'
  )

  t.deepEqual(
    toHtml(h('table', [h('colgroup'), h('tr')]), {omitOptionalTags: true}),
    '<table><colgroup><tr></table>',
    'should omit tag followed by others'
  )

  t.end()
})
