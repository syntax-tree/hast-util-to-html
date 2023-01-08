import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`html` (opening)', () => {
  assert.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit tag without first child'
  )

  assert.deepEqual(
    toHtml(h('html', [u('comment', 'alpha'), 'bravo']), {
      omitOptionalTags: true
    }),
    '<html><!--alpha-->bravo',
    'should not omit tag if head is `comment`'
  )

  assert.deepEqual(
    toHtml(h('html', 'bravo'), {omitOptionalTags: true}),
    'bravo',
    'should omit tag if head is not `comment`'
  )
})
