import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('`colgroup` (closing)', async function (t) {
  await t.test('should not omit tag without children', async function () {
    assert.deepEqual(
      toHtml(h('colgroup'), {omitOptionalTags: true}),
      '<colgroup>'
    )
  })

  await t.test('should omit tag if head is `col`', async function () {
    assert.deepEqual(
      toHtml(h('colgroup', h('col', {span: 2})), {omitOptionalTags: true}),
      '<col span="2">'
    )
  })

  await t.test('should not omit tag if head is not `col`', async function () {
    assert.deepEqual(
      toHtml(h('colgroup', [u('comment', 'alpha')]), {omitOptionalTags: true}),
      '<colgroup><!--alpha-->'
    )
  })

  await t.test(
    'should not omit tag if previous is `colgroup` whose closing tag is omitted',
    async function () {
      assert.deepEqual(
        toHtml(
          h('table', [
            h('colgroup', [h('col', {span: 2})]),
            h('colgroup', [h('col', {span: 3})])
          ]),
          {omitOptionalTags: true}
        ),
        '<table><col span="2"><colgroup><col span="3"></table>'
      )
    }
  )
})
