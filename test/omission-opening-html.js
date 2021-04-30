import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`html` (opening)', function (t) {
  t.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit tag without first child'
  )

  t.deepEqual(
    toHtml(h('html', [u('comment', 'alpha'), 'bravo']), {
      omitOptionalTags: true
    }),
    '<html><!--alpha-->bravo',
    'should not omit tag if head is `comment`'
  )

  t.deepEqual(
    toHtml(h('html', 'bravo'), {omitOptionalTags: true}),
    'bravo',
    'should omit tag if head is not `comment`'
  )

  t.end()
})
