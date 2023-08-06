import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`omitOptionalTags` mode', async function (t) {
  await t.test('should omit opening and closing tags', async function () {
    assert.deepEqual(toHtml(h('html'), {omitOptionalTags: true}), '')
  })

  await t.test(
    'should not omit opening tags with attributes',
    async function () {
      assert.deepEqual(
        toHtml(h('html', {lang: 'en'}), {omitOptionalTags: true}),
        '<html lang="en">'
      )
    }
  )

  await t.test(
    'should ignore whitespace when determining whether tags can be omitted (#1)',
    async function () {
      assert.deepEqual(
        toHtml(h('ol', [h('li', 'alpha'), h('li', 'bravo')]), {
          omitOptionalTags: true
        }),
        '<ol><li>alpha<li>bravo</ol>'
      )
    }
  )

  await t.test(
    'should ignore whitespace when determining whether tags can be omitted (#2)',
    async function () {
      assert.deepEqual(
        toHtml(h('ol', [h('li', 'alpha'), ' ', h('li', 'bravo'), '\t']), {
          omitOptionalTags: true
        }),
        '<ol><li>alpha <li>bravo\t</ol>'
      )
    }
  )
})
