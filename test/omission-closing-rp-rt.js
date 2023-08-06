import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

/**
 * @param {'rp' | 'rt'} tagName
 */
function createTest(tagName) {
  const other = tagName === 'rp' ? 'rt' : 'rp'

  test('`' + tagName + '` (closing)', async function (t) {
    await t.test('should omit tag without parent', async function () {
      assert.deepEqual(
        toHtml(h(tagName), {omitOptionalTags: true}),
        '<' + tagName + '>'
      )
    })

    await t.test('should omit tag without following', async function () {
      assert.deepEqual(
        toHtml(h('ruby', h(tagName)), {omitOptionalTags: true}),
        '<ruby><' + tagName + '></ruby>'
      )
    })

    await t.test(
      'should omit tag followed by `' + tagName + '`',
      async function () {
        assert.deepEqual(
          toHtml(h('ruby', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
          '<ruby><' + tagName + '><' + tagName + '></ruby>'
        )
      }
    )

    await t.test(
      'should omit tag followed by `' + other + '`',
      async function () {
        assert.deepEqual(
          toHtml(h('ruby', [h(tagName), h(other)]), {omitOptionalTags: true}),
          '<ruby><' + tagName + '><' + other + '></ruby>'
        )
      }
    )

    await t.test('should not omit tag followed by others', async function () {
      assert.deepEqual(
        toHtml(h('ruby', [h(tagName), h('p')]), {omitOptionalTags: true}),
        '<ruby><' + tagName + '></' + tagName + '><p></ruby>'
      )
    })
  })
}

createTest('rp')
createTest('rt')
