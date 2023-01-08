import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`html` (closing)', () => {
  assert.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(u('root', [h('html'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '</html><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  assert.deepEqual(
    toHtml(u('root', [h('html'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    'alpha',
    'should omit tag if not followed by `comment`'
  )
})
