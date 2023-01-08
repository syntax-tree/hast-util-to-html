import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`head` (opening)', () => {
  assert.deepEqual(
    toHtml(h('head', h('meta', {charSet: 'utf8'})), {omitOptionalTags: true}),
    '<meta charset="utf8">',
    'should omit tag with children'
  )

  assert.deepEqual(
    toHtml(h('head'), {omitOptionalTags: true}),
    '<head>',
    'should not omit tag without children'
  )

  assert.deepEqual(
    toHtml(h('head', h('title', 'alpha')), {omitOptionalTags: true}),
    '<title>alpha</title>',
    'should omit tag with `title`'
  )

  assert.deepEqual(
    toHtml(h('head', h('base')), {omitOptionalTags: true}),
    '<base>',
    'should omit tag with `base`'
  )

  assert.deepEqual(
    toHtml(h('head', [h('title'), h('title')]), {omitOptionalTags: true}),
    '<head><title></title><title></title>',
    'should not omit tag with multiple `title`s'
  )

  assert.deepEqual(
    toHtml(h('head', [h('base'), h('base')]), {omitOptionalTags: true}),
    '<head><base><base>',
    'should not omit tag with multiple `base`s'
  )
})
