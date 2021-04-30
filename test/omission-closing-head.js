import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`head` (closing)', function (t) {
  t.deepEqual(
    toHtml(h('head'), {omitOptionalTags: true}),
    '<head>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('html', [h('head'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<head></head><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  t.deepEqual(
    toHtml(h('html', [h('head'), ' alpha']), {omitOptionalTags: true}),
    '<head></head> alpha',
    'should not omit tag if the next sibling starts with whitespace'
  )

  t.deepEqual(
    toHtml(h('html', [h('head'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<head>alpha',
    'should omit tag if not followed by `comment`'
  )

  t.end()
})
