import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`body` (closing)', () => {
  assert.deepEqual(
    toHtml(h('body'), {omitOptionalTags: true}),
    '',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('html', [h('body'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '</body><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  assert.deepEqual(
    toHtml(h('html', [h('body'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    'alpha',
    'should omit tag if not followed by `comment`'
  )
})
