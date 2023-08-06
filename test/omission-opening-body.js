import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`body` (opening)', async function (t) {
  await t.test('should omit tag without children', async function () {
    assert.deepEqual(toHtml(h('body'), {omitOptionalTags: true}), '')
  })

  await t.test(
    'should not omit tag if the head is a `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('body', u('comment', 'alpha')), {omitOptionalTags: true}),
        '<body><!--alpha-->'
      )
    }
  )

  await t.test(
    'should not omit tag if the head starts with whitespace',
    async function () {
      assert.deepEqual(
        toHtml(h('body', ' alpha'), {omitOptionalTags: true}),
        '<body> alpha'
      )
    }
  )

  await t.test('should not omit tag if head is `meta`', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('meta')]), {omitOptionalTags: true}),
      '<body><meta>'
    )
  })

  await t.test('should not omit tag if head is `link`', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('link')]), {omitOptionalTags: true}),
      '<body><link>'
    )
  })

  await t.test('should not omit tag if head is `script`', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('script')]), {omitOptionalTags: true}),
      '<body><script></script>'
    )
  })

  await t.test('should not omit tag if head is `style`', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('style')]), {omitOptionalTags: true}),
      '<body><style></style>'
    )
  })

  await t.test('should not omit tag if head is `template`', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('template')]), {omitOptionalTags: true}),
      '<body><template></template>'
    )
  })

  await t.test('should omit tag if head is something else', async function () {
    assert.deepEqual(
      toHtml(h('body', [h('div')]), {omitOptionalTags: true}),
      '<div></div>'
    )
  })
})
