import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`text`', async function (t) {
  await t.test('should serialize `text`s', async function () {
    assert.deepEqual(toHtml(u('text', 'alpha')), 'alpha')
  })

  await t.test('should encode `text`s', async function () {
    assert.deepEqual(toHtml(u('text', '3 < 5 & 7')), '3 &#x3C; 5 &#x26; 7')
  })

  await t.test('should not encode `text`s in `style`', async function () {
    assert.deepEqual(
      toHtml(h('style', u('text', '*:before {content: "3 < 5"}'))),
      '<style>*:before {content: "3 < 5"}</style>'
    )
  })

  await t.test('should not encode `text`s in `script`', async function () {
    assert.deepEqual(
      toHtml(h('script', u('text', 'alert("3 < 5")'))),
      '<script>alert("3 < 5")</script>'
    )
  })

  await t.test('should encode `text`s in other nodes', async function () {
    assert.deepEqual(toHtml(h('b', u('text', '3 < 5'))), '<b>3 &#x3C; 5</b>')
  })
})
