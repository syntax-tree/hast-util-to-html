import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`colgroup` (closing)', function (t) {
  t.deepEqual(
    toHtml(h('colgroup'), {omitOptionalTags: true}),
    '<colgroup>',
    'should not omit tag without children'
  )

  t.deepEqual(
    toHtml(h('colgroup', h('col', {span: 2})), {omitOptionalTags: true}),
    '<col span="2">',
    'should omit tag if head is `col`'
  )

  t.deepEqual(
    toHtml(h('colgroup', [u('comment', 'alpha')]), {omitOptionalTags: true}),
    '<colgroup><!--alpha-->',
    'should not omit tag if head is not `col`'
  )

  t.deepEqual(
    toHtml(
      h('table', [
        h('colgroup', [h('col', {span: 2})]),
        h('colgroup', [h('col', {span: 3})])
      ]),
      {omitOptionalTags: true}
    ),
    '<table><col span="2"><colgroup><col span="3"></table>',
    'should not omit tag if previous is `colgroup` whose closing tag is omitted'
  )

  t.end()
})
