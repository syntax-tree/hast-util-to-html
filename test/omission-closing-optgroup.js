import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`optgroup` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('optgroup'), {omitOptionalTags: true}),
    '<optgroup>',
    'should omit tag without parent'
  )

  t.deepEqual(
    toHtml(h('select', h('optgroup')), {omitOptionalTags: true}),
    '<select><optgroup></select>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('select', [h('optgroup'), h('optgroup')]), {
      omitOptionalTags: true
    }),
    '<select><optgroup><optgroup></select>',
    'should omit tag followed by `optgroup`'
  )

  t.deepEqual(
    toHtml(h('select', [h('optgroup'), h('p')]), {omitOptionalTags: true}),
    '<select><optgroup></optgroup><p></select>',
    'should not omit tag followed by others'
  )

  t.end()
})
