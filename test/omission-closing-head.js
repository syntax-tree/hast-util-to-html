import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`head` (closing)', async function (t) {
  await t.test('should omit tag without following', async function () {
    assert.deepEqual(toHtml(h('head'), {omitOptionalTags: true}), '')
  })

  await t.test(
    'should not omit tag if followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), {type: 'comment', value: 'alpha'}]), {
          omitOptionalTags: true
        }),
        '</head><!--alpha-->'
      )
    }
  )

  await t.test(
    'should not omit tag if the next sibling starts with whitespace',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), ' alpha']), {omitOptionalTags: true}),
        '</head> alpha'
      )
    }
  )

  await t.test(
    'should omit tag if not followed by `comment`',
    async function () {
      assert.deepEqual(
        toHtml(h('html', [h('head'), {type: 'text', value: 'alpha'}]), {
          omitOptionalTags: true
        }),
        'alpha'
      )
    }
  )
})
