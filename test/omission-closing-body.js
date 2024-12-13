import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`body` (closing)', async function (t) {
  await t.test('should omit tag without following', async function () {
    assert.deepEqual(toHtml(h('body'), {omitOptionalTags: true}), '')
  })

  await t.test(
    'should not omit tag if followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('body'), {type: 'comment', value: 'alpha'}]), {
          omitOptionalTags: true
        }),
        '</body><!--alpha-->'
      )
    }
  )

  await t.test(
    'should omit tag if not followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('body'), {type: 'text', value: 'alpha'}]), {
          omitOptionalTags: true
        }),
        'alpha'
      )
    }
  )
})
