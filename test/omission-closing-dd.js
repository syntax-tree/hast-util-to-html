import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`dd` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('dd'), {omitOptionalTags: true}),
    '<dd>',
    'should omit tag without parent'
  )

  t.deepEqual(
    toHtml(h('dl', h('dd')), {omitOptionalTags: true}),
    '<dl><dd></dl>',
    'should omit tag without following'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dd'), h('dd')]), {omitOptionalTags: true}),
    '<dl><dd><dd></dl>',
    'should omit tag followed by `dd`'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dd'), h('dt')]), {omitOptionalTags: true}),
    '<dl><dd><dt></dt></dl>',
    'should omit tag followed by `dt`'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dd'), h('p')]), {omitOptionalTags: true}),
    '<dl><dd></dd><p></dl>',
    'should not omit tag followed by others'
  )

  t.end()
})
