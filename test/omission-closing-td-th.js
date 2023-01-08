import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

/**
 * @param {'td' | 'th'} tagName
 */
function createTest(tagName) {
  const other = tagName === 'td' ? 'th' : 'td'
  test('`' + tagName + '` (closing)', () => {
    assert.deepEqual(
      toHtml(h(tagName), {omitOptionalTags: true}),
      '<' + tagName + '>',
      'should omit tag without parent'
    )

    assert.deepEqual(
      toHtml(h('tr', h(tagName)), {omitOptionalTags: true}),
      '<tr><' + tagName + '>',
      'should omit tag without following'
    )

    assert.deepEqual(
      toHtml(h('tr', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + tagName + '>',
      'should omit tag followed by `' + tagName + '`'
    )

    assert.deepEqual(
      toHtml(h('tr', [h(tagName), h(other)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + other + '>',
      'should omit tag followed by `' + other + '`'
    )

    assert.deepEqual(
      toHtml(h('tr', [h(tagName), h('p')]), {omitOptionalTags: true}),
      '<tr><' + tagName + '></' + tagName + '><p>',
      'should not omit tag followed by others'
    )
  })
}

createTest('td')
createTest('th')
