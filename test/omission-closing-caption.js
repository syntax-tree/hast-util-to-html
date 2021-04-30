import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`caption` (closing)', function (t) {
  t.deepEqual(
    toHtml(h('caption'), {omitOptionalTags: true}),
    '<caption>',
    'should not omit tag without children'
  )

  t.deepEqual(
    toHtml(h('table', h('caption')), {omitOptionalTags: true}),
    '<table><caption></table>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('table', [h('caption'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<table><caption></caption><!--alpha--></table>',
    'should not omit tag followed by `comment`'
  )

  t.deepEqual(
    toHtml(h('table', [h('caption'), ' alpha']), {omitOptionalTags: true}),
    '<table><caption></caption> alpha</table>',
    'should not omit tag followed by whitespace'
  )

  t.deepEqual(
    toHtml(h('table', [h('caption'), h('tr')]), {omitOptionalTags: true}),
    '<table><caption><tr></table>',
    'should omit tag followed by others'
  )

  t.end()
})
