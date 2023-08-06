import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`menuitem` (closing)', async function (t) {
  await t.test('should omit tag without parent', async function () {
    assert.deepEqual(
      toHtml(h('menuitem', 'alpha'), {omitOptionalTags: true}),
      '<menuitem>alpha</menuitem>'
    )
  })

  await t.test('should omit tag without following', async function () {
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem', 'alpha')]), {omitOptionalTags: true}),
      '<menu><menuitem>alpha</menuitem></menu>'
    )
  })

  await t.test('should omit tag followed by `menuitem`', async function () {
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem'), h('menuitem')]), {
        omitOptionalTags: true
      }),
      '<menu><menuitem></menuitem><menuitem></menuitem></menu>'
    )
  })

  await t.test('should omit tag followed by `hr`', async function () {
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem', 'alpha'), h('hr')]), {
        omitOptionalTags: true
      }),
      '<menu><menuitem>alpha</menuitem><hr></menu>'
    )
  })

  await t.test('should omit tag followed by `menu`', async function () {
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem', 'alpha'), h('menu')]), {
        omitOptionalTags: true
      }),
      '<menu><menuitem>alpha</menuitem><menu></menu></menu>'
    )
  })

  await t.test('should not omit tag followed by others', async function () {
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem', 'alpha'), h('p')]), {
        omitOptionalTags: true
      }),
      '<menu><menuitem>alpha</menuitem><p></menu>'
    )
  })

  await t.test('should omit tag when without children', async function () {
    // This actually tests an edge case where `menuitems`, which can have children
    // in WHATWG HTML, but not in W3C HTML, here do not have children.
    assert.deepEqual(
      toHtml(h('menu', [h('menuitem'), h('p')]), {omitOptionalTags: true}),
      '<menu><menuitem></menuitem><p></menu>'
    )
  })
})
