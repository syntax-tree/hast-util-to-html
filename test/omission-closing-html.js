import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('`html` (closing)', async function (t) {
  await t.test('should omit tag without following', async function () {
    assert.deepEqual(toHtml(h('html'), {omitOptionalTags: true}), '')
  })

  await t.test(
    'should not omit tag if followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(u('root', [h('html'), u('comment', 'alpha')]), {
          omitOptionalTags: true
        }),
        '</html><!--alpha-->'
      )
    }
  )

  await t.test(
    'should omit tag if not followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(u('root', [h('html'), u('text', 'alpha')]), {
          omitOptionalTags: true
        }),
        'alpha'
      )
    }
  )
})
