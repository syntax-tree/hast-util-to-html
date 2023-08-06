import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`head` (closing)', async function (t) {
  await t.test('should omit tag without following', async function () {
    assert.deepEqual(toHtml(h('head'), {omitOptionalTags: true}), '<head>')
  })

  await t.test(
    'should not omit tag if followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), u('comment', 'alpha')]), {
          omitOptionalTags: true
        }),
        '<head></head><!--alpha-->'
      )
    }
  )

  await t.test(
    'should not omit tag if the next sibling starts with whitespace',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), ' alpha']), {omitOptionalTags: true}),
        '<head></head> alpha'
      )
    }
  )

  await t.test(
    'should omit tag if not followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), u('text', 'alpha')]), {
          omitOptionalTags: true
        }),
        '<head>alpha'
      )
    }
  )
})
