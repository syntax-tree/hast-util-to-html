import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`body` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('body'), {omitOptionalTags: true}),
    '',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('html', [h('body'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '</body><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  t.deepEqual(
    toHtml(h('html', [h('body'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    'alpha',
    'should omit tag if not followed by `comment`'
  )

  t.end()
})
