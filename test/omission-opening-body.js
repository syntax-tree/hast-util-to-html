import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`body` (opening)', () => {
  assert.deepEqual(
    toHtml(h('body'), {omitOptionalTags: true}),
    '',
    'should omit tag without children'
  )

  assert.deepEqual(
    toHtml(h('body', u('comment', 'alpha')), {omitOptionalTags: true}),
    '<body><!--alpha-->',
    'should not omit tag if the head is a `comment`'
  )

  assert.deepEqual(
    toHtml(h('body', ' alpha'), {omitOptionalTags: true}),
    '<body> alpha',
    'should not omit tag if the head starts with whitespace'
  )

  assert.deepEqual(
    toHtml(h('body', [h('meta')]), {omitOptionalTags: true}),
    '<body><meta>',
    'should not omit tag if head is `meta`'
  )

  assert.deepEqual(
    toHtml(h('body', [h('link')]), {omitOptionalTags: true}),
    '<body><link>',
    'should not omit tag if head is `link`'
  )

  assert.deepEqual(
    toHtml(h('body', [h('script')]), {omitOptionalTags: true}),
    '<body><script></script>',
    'should not omit tag if head is `script`'
  )

  assert.deepEqual(
    toHtml(h('body', [h('style')]), {omitOptionalTags: true}),
    '<body><style></style>',
    'should not omit tag if head is `style`'
  )

  assert.deepEqual(
    toHtml(h('body', [h('template')]), {omitOptionalTags: true}),
    '<body><template></template>',
    'should not omit tag if head is `template`'
  )

  assert.deepEqual(
    toHtml(h('body', [h('div')]), {omitOptionalTags: true}),
    '<div></div>',
    'should omit tag if head is something else'
  )
})
