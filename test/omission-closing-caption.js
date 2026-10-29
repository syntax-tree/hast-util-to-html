import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`caption` (closing)', async function (t) {
  await t.test('should not omit tag without children', async function () {
    assert.equal(toHtml(h('caption'), {omitOptionalTags: true}), '<caption>')
  })

  await t.test('should omit tag without following', async function () {
    assert.equal(
      toHtml(h('table', h('caption')), {omitOptionalTags: true}),
      '<table><caption></table>'
    )
  })

  await t.test('should not omit tag followed by `comment`', async function () {
    assert.equal(
      toHtml(h('table', [h('caption'), {type: 'comment', value: 'alpha'}]), {
        omitOptionalTags: true
      }),
      '<table><caption></caption><!--alpha--></table>'
    )
  })

  await t.test('should not omit tag followed by whitespace', async function () {
    assert.equal(
      toHtml(h('table', [h('caption'), ' alpha']), {omitOptionalTags: true}),
      '<table><caption></caption> alpha</table>'
    )
  })

  await t.test('should omit tag followed by others', async function () {
    assert.equal(
      toHtml(h('table', [h('caption'), h('tr')]), {omitOptionalTags: true}),
      '<table><caption><tr></table>'
    )
  })
})
