import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`head` (opening)', (t) => {
  t.deepEqual(
    toHtml(h('head', h('meta', {charSet: 'utf8'})), {omitOptionalTags: true}),
    '<meta charset="utf8">',
    'should omit tag with children'
  )

  t.deepEqual(
    toHtml(h('head'), {omitOptionalTags: true}),
    '<head>',
    'should not omit tag without children'
  )

  t.deepEqual(
    toHtml(h('head', h('title', 'alpha')), {omitOptionalTags: true}),
    '<title>alpha</title>',
    'should omit tag with `title`'
  )

  t.deepEqual(
    toHtml(h('head', h('base')), {omitOptionalTags: true}),
    '<base>',
    'should omit tag with `base`'
  )

  t.deepEqual(
    toHtml(h('head', [h('title'), h('title')]), {omitOptionalTags: true}),
    '<head><title></title><title></title>',
    'should not omit tag with multiple `title`s'
  )

  t.deepEqual(
    toHtml(h('head', [h('base'), h('base')]), {omitOptionalTags: true}),
    '<head><base><base>',
    'should not omit tag with multiple `base`s'
  )

  t.end()
})
