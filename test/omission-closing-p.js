import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`p` (closing)', async function (t) {
  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(u('root', [h('p')]), {omitOptionalTags: true}),
      '<p>'
    )
  })

  await t.test('should omit tag if followed by `address`', async function () {
    assert.deepEqual(
      toHtml(u('root', [h('p'), h('address')]), {omitOptionalTags: true}),
      '<p><address></address>'
    )
  })

  await t.test('should omit tag if followed by `ul`', async function () {
    assert.deepEqual(
      toHtml(u('root', [h('p'), h('ul')]), {omitOptionalTags: true}),
      '<p><ul></ul>'
    )
  })

  await t.test('should not omit tag if followed by `a`', async function () {
    assert.deepEqual(
      toHtml(u('root', [h('p'), h('a')]), {omitOptionalTags: true}),
      '<p></p><a></a>'
    )
  })

  await t.test('should not omit tag if followed by `xmp`', async function () {
    assert.deepEqual(
      toHtml(u('root', [h('p'), h('xmp')]), {omitOptionalTags: true}),
      '<p></p><xmp></xmp>'
    )
  })

  await t.test('should omit tag without parent', async function () {
    assert.deepEqual(toHtml(h('p'), {omitOptionalTags: true}), '<p>')
  })

  await t.test('should not omit tag if parent is `a`', async function () {
    assert.deepEqual(
      toHtml(h('a', [h('p')]), {omitOptionalTags: true}),
      '<a><p></p></a>'
    )
  })

  await t.test('should not omit tag if parented by `video`', async function () {
    assert.deepEqual(
      toHtml(h('video', [h('p')]), {omitOptionalTags: true}),
      '<video><p></p></video>'
    )
  })

  await t.test('should not omit tag if parent is `article`', async function () {
    assert.deepEqual(
      toHtml(h('article', [h('p')]), {omitOptionalTags: true}),
      '<article><p></article>'
    )
  })

  await t.test(
    'should not omit tag if parented by `section`',
    async function () {
      assert.deepEqual(
        toHtml(h('section', [h('p')]), {omitOptionalTags: true}),
        '<section><p></section>'
      )
    }
  )
})
