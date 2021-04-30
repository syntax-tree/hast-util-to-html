import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`html` (closing)', function (t) {
  t.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(u('root', [h('html'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '</html><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  t.deepEqual(
    toHtml(u('root', [h('html'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    'alpha',
    'should omit tag if not followed by `comment`'
  )

  t.end()
})
