import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`li` (closing)', function (t) {
  t.deepEqual(
    toHtml(h('li'), {omitOptionalTags: true}),
    '<li>',
    'should omit tag without parent'
  )

  t.deepEqual(
    toHtml(h('ol', h('li')), {omitOptionalTags: true}),
    '<ol><li></ol>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('ol', [h('li'), h('li')]), {omitOptionalTags: true}),
    '<ol><li><li></ol>',
    'should omit tag followed by `li`'
  )

  t.deepEqual(
    toHtml(h('ol', [h('li'), h('p')]), {omitOptionalTags: true}),
    '<ol><li></li><p></ol>',
    'should not omit tag followed by others'
  )

  t.end()
})
