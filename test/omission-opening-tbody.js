import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`tbody` (opening)', async function (t) {
  await t.test('should not omit tag without children', async function () {
    assert.deepEqual(toHtml(h('tbody'), {omitOptionalTags: true}), '<tbody>')
  })

  await t.test('should omit tag if head is `tr`', async function () {
    assert.deepEqual(
      toHtml(h('tbody', h('tr')), {omitOptionalTags: true}),
      '<tr>'
    )
  })

  await t.test(
    'should not omit tag preceded by an omitted `thead` closing tag',
    async function () {
      assert.deepEqual(
        toHtml(h('table', [h('thead', h('tr')), h('tbody', h('tr'))]), {
          omitOptionalTags: true
        }),
        '<table><thead><tr><tbody><tr></table>'
      )
    }
  )

  await t.test(
    'should not omit tag preceded by an omitted `tbody` closing tag',
    async function () {
      assert.deepEqual(
        toHtml(h('table', [h('tbody', h('tr')), h('tbody', h('tr'))]), {
          omitOptionalTags: true
        }),
        '<table><tr><tbody><tr></table>'
      )
    }
  )
})
