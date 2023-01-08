import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`menuitem` (closing)', () => {
  assert.deepEqual(
    toHtml(h('menuitem', 'alpha'), {omitOptionalTags: true}),
    '<menuitem>alpha',
    'should omit tag without parent'
  )

  assert.deepEqual(
    toHtml(h('menu', [h('menuitem', 'alpha')]), {omitOptionalTags: true}),
    '<menu><menuitem>alpha</menu>',
    'should omit tag without following'
  )

  assert.deepEqual(
    toHtml(h('menu', [h('menuitem'), h('menuitem')]), {omitOptionalTags: true}),
    '<menu><menuitem><menuitem></menu>',
    'should omit tag followed by `menuitem`'
  )

  assert.deepEqual(
    toHtml(h('menu', [h('menuitem', 'alpha'), h('hr')]), {
      omitOptionalTags: true
    }),
    '<menu><menuitem>alpha<hr></menu>',
    'should omit tag followed by `hr`'
  )

  assert.deepEqual(
    toHtml(h('menu', [h('menuitem', 'alpha'), h('menu')]), {
      omitOptionalTags: true
    }),
    '<menu><menuitem>alpha<menu></menu></menu>',
    'should omit tag followed by `menu`'
  )

  assert.deepEqual(
    toHtml(h('menu', [h('menuitem', 'alpha'), h('p')]), {
      omitOptionalTags: true
    }),
    '<menu><menuitem>alpha</menuitem><p></menu>',
    'should not omit tag followed by others'
  )

  // This actually tests an edge case where `menuitems`, which can have children
  // in WHATWG HTML, but not in W3C HTML, here do not have children.
  assert.deepEqual(
    toHtml(h('menu', [h('menuitem'), h('p')]), {omitOptionalTags: true}),
    '<menu><menuitem><p></menu>',
    'should omit tag when without children'
  )
})
