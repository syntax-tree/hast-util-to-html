import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

// eslint-disable-next-line unicorn/no-array-for-each
'rp,rt'.split(',').forEach((tagName, index, values) => {
  test('`' + tagName + '` (closing)', (t) => {
    const other = values[index ? 0 : 1]

    t.deepEqual(
      toHtml(h(tagName), {omitOptionalTags: true}),
      '<' + tagName + '>',
      'should omit tag without parent'
    )

    t.deepEqual(
      toHtml(h('ruby', h(tagName)), {omitOptionalTags: true}),
      '<ruby><' + tagName + '></ruby>',
      'should omit tag without following'
    )

    t.deepEqual(
      toHtml(h('ruby', [h(tagName), h(tagName)]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '><' + tagName + '></ruby>',
      'should omit tag followed by `' + tagName + '`'
    )

    t.deepEqual(
      toHtml(h('ruby', [h(tagName), h(other)]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '><' + other + '></ruby>',
      'should omit tag followed by `' + other + '`'
    )

    t.deepEqual(
      toHtml(h('ruby', [h(tagName), h('p')]), {omitOptionalTags: true}),
      '<ruby><' + tagName + '></' + tagName + '><p></ruby>',
      'should not omit tag followed by others'
    )

    t.end()
  })
})
