import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

// eslint-disable-next-line unicorn/no-array-for-each
'td,th'.split(',').forEach(function (tagName, index, values) {
  test('`' + tagName + '` (closing)', function (t) {
    var other = values[index ? 0 : 1]

    t.deepEqual(
      toHtml(h(tagName), {omitOptionalTags: true}),
      '<' + tagName + '>',
      'should omit tag without parent'
    )

    t.deepEqual(
      toHtml(h('tr', h(tagName)), {omitOptionalTags: true}),
      '<tr><' + tagName + '>',
      'should omit tag without following'
    )

    t.deepEqual(
      toHtml(h('tr', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + tagName + '>',
      'should omit tag followed by `' + tagName + '`'
    )

    t.deepEqual(
      toHtml(h('tr', [h(tagName), h(other)]), {omitOptionalTags: true}),
      '<tr><' + tagName + '><' + other + '>',
      'should omit tag followed by `' + other + '`'
    )

    t.deepEqual(
      toHtml(h('tr', [h(tagName), h('p')]), {omitOptionalTags: true}),
      '<tr><' + tagName + '></' + tagName + '><p>',
      'should not omit tag followed by others'
    )

    t.end()
  })
})
