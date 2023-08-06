import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

/**
 * @param {'td' | 'th'} tagName
 */
function createTest(tagName) {
  const other = tagName === 'td' ? 'th' : 'td'

  test('`' + tagName + '` (closing)', async function (t) {
    await t.test('should omit tag without parent', async function () {
      assert.deepEqual(
        toHtml(h(tagName), {omitOptionalTags: true}),
        '<' + tagName + '>'
      )
    })

    await t.test('should omit tag without following', async function () {
      assert.deepEqual(
        toHtml(h('tr', h(tagName)), {omitOptionalTags: true}),
        '<tr><' + tagName + '>'
      )
    })

    await t.test(
      'should omit tag followed by `' + tagName + '`',
      async function () {
        assert.deepEqual(
          toHtml(h('tr', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
          '<tr><' + tagName + '><' + tagName + '>'
        )
      }
    )

    await t.test(
      'should omit tag followed by `' + other + '`',
      async function () {
        assert.deepEqual(
          toHtml(h('tr', [h(tagName), h(other)]), {omitOptionalTags: true}),
          '<tr><' + tagName + '><' + other + '>'
        )
      }
    )

    await t.test('should not omit tag followed by others', async function () {
      assert.deepEqual(
        toHtml(h('tr', [h(tagName), h('p')]), {omitOptionalTags: true}),
        '<tr><' + tagName + '></' + tagName + '><p>'
      )
    })
  })
}

createTest('td')
createTest('th')
