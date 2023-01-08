import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`p` (closing)', () => {
  assert.deepEqual(
    toHtml(u('root', [h('p')]), {omitOptionalTags: true}),
    '<p>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(u('root', [h('p'), h('address')]), {omitOptionalTags: true}),
    '<p><address></address>',
    'should omit tag if followed by `address`'
  )

  assert.deepEqual(
    toHtml(u('root', [h('p'), h('ul')]), {omitOptionalTags: true}),
    '<p><ul></ul>',
    'should omit tag if followed by `ul`'
  )

  assert.deepEqual(
    toHtml(u('root', [h('p'), h('a')]), {omitOptionalTags: true}),
    '<p></p><a></a>',
    'should not omit tag if followed by `a`'
  )

  assert.deepEqual(
    toHtml(u('root', [h('p'), h('xmp')]), {omitOptionalTags: true}),
    '<p></p><xmp></xmp>',
    'should not omit tag if followed by `xmp`'
  )

  assert.deepEqual(
    toHtml(h('p'), {omitOptionalTags: true}),
    '<p>',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('a', [h('p')]), {omitOptionalTags: true}),
    '<a><p></p></a>',
    'should not omit tag if parent is `a`'
  )

  assert.deepEqual(
    toHtml(h('video', [h('p')]), {omitOptionalTags: true}),
    '<video><p></p></video>',
    'should not omit tag if parented by `video`'
  )

  assert.deepEqual(
    toHtml(h('article', [h('p')]), {omitOptionalTags: true}),
    '<article><p></article>',
    'should not omit tag if parent is `article`'
  )

  assert.deepEqual(
    toHtml(h('section', [h('p')]), {omitOptionalTags: true}),
    '<section><p></section>',
    'should not omit tag if parented by `section`'
  )
})
