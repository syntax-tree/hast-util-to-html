import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`head` (closing)', () => {
  assert.deepEqual(
    toHtml(h('head'), {omitOptionalTags: true}),
    '<head>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('html', [h('head'), u('comment', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<head></head><!--alpha-->',
    'should not omit tag if followed by `comment`'
  )

  assert.deepEqual(
    toHtml(h('html', [h('head'), ' alpha']), {omitOptionalTags: true}),
    '<head></head> alpha',
    'should not omit tag if the next sibling starts with whitespace'
  )

  assert.deepEqual(
    toHtml(h('html', [h('head'), u('text', 'alpha')]), {
      omitOptionalTags: true
    }),
    '<head>alpha',
    'should omit tag if not followed by `comment`'
  )
})
