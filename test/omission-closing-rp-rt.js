import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

/**
 * @param {'rp' | 'rt'} tagName
 */
function createTest(tagName) {
  const other = tagName === 'rp' ? 'rt' : 'rp'
  test('`' + tagName + '` (closing)', () => {
    assert.deepEqual(
      toHtml(h(tagName), {omitOptionalTags: true}),
      '<' + tagName + '>',
      'should omit tag without parent'
    )

    assert.deepEqual(
      toHtml(h('ruby', h(tagName)), {omitOptionalTags: true}),
      '<ruby><' + tagName + '></ruby>',
      'should omit tag without following'
    )

    assert.deepEqual(
      toHtml(h('ruby', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '><' + tagName + '></ruby>',
      'should omit tag followed by `' + tagName + '`'
    )

    assert.deepEqual(
      toHtml(h('ruby', [h(tagName), h(other)]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '><' + other + '></ruby>',
      'should omit tag followed by `' + other + '`'
    )

    assert.deepEqual(
      toHtml(h('ruby', [h(tagName), h('p')]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '></' + tagName + '><p></ruby>',
      'should not omit tag followed by others'
    )
  })
}

createTest('rp')
createTest('rt')
