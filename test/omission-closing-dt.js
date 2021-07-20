import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`dt` (closing)', (t) => {
  t.deepEqual(
    toHtml(h('dt'), {omitOptionalTags: true}),
    '<dt></dt>',
    'should not omit tag without parent'
  )

  t.deepEqual(
    toHtml(h('dl', h('dt')), {omitOptionalTags: true}),
    '<dl><dt></dt></dl>',
    'should not omit tag without following'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dt'), h('dt')]), {omitOptionalTags: true}),
    '<dl><dt><dt></dt></dl>',
    'should omit tag followed by `dt`'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dt'), h('dd')]), {omitOptionalTags: true}),
    '<dl><dt><dd></dl>',
    'should omit tag followed by `dd`'
  )

  t.deepEqual(
    toHtml(h('dl', [h('dt'), h('p')]), {omitOptionalTags: true}),
    '<dl><dt></dt><p></dl>',
    'should not omit tag followed by others'
  )

  t.end()
})
