import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`p` (closing)', function (t) {
  t.deepEqual(
    toHtml(u('root', [h('p')]), {omitOptionalTags: true}),
    '<p>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(u('root', [h('p'), h('address')]), {omitOptionalTags: true}),
    '<p><address></address>',
    'should omit tag if followed by `address`'
  )

  t.deepEqual(
    toHtml(u('root', [h('p'), h('ul')]), {omitOptionalTags: true}),
    '<p><ul></ul>',
    'should omit tag if followed by `ul`'
  )

  t.deepEqual(
    toHtml(u('root', [h('p'), h('a')]), {omitOptionalTags: true}),
    '<p></p><a></a>',
    'should not omit tag if followed by `a`'
  )

  t.deepEqual(
    toHtml(u('root', [h('p'), h('xmp')]), {omitOptionalTags: true}),
    '<p></p><xmp></xmp>',
    'should not omit tag if followed by `xmp`'
  )

  t.deepEqual(
    toHtml(h('p'), {omitOptionalTags: true}),
    '<p>',
    'should omit tag without parent'
  )

  t.deepEqual(
    toHtml(h('a', [h('p')]), {omitOptionalTags: true}),
    '<a><p></p></a>',
    'should not omit tag if parent is `a`'
  )

  t.deepEqual(
    toHtml(h('video', [h('p')]), {omitOptionalTags: true}),
    '<video><p></p></video>',
    'should not omit tag if parented by `video`'
  )

  t.deepEqual(
    toHtml(h('article', [h('p')]), {omitOptionalTags: true}),
    '<article><p></article>',
    'should not omit tag if parent is `article`'
  )

  t.deepEqual(
    toHtml(h('section', [h('p')]), {omitOptionalTags: true}),
    '<section><p></section>',
    'should not omit tag if parented by `section`'
  )

  t.end()
})
