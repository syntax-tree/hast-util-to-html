import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`html` (opening)', async function (t) {
  await t.test('should omit tag without first child', async function () {
    assert.deepEqual(toHtml(h('html'), {omitOptionalTags: true}), '')
  })

  await t.test('should not omit tag if head is `comment`', async function () {
    assert.deepEqual(
      toHtml(h('html', [{type: 'comment', value: 'alpha'}, 'bravo']), {
        omitOptionalTags: true
      }),
      '<html><!--alpha-->bravo'
    )
  })

  await t.test('should omit tag if head is not `comment`', async function () {
    assert.deepEqual(
      toHtml(h('html', 'bravo'), {omitOptionalTags: true}),
      'bravo'
    )
  })
})
