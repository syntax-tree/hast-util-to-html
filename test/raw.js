/**
 * @typedef {import('hast-util-raw')} DoNotTouchThisRegistersRawInTheTree
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`element`', async function (t) {
  await t.test('should encode `raw`s', async function () {
    assert.deepEqual(
      toHtml(u('raw', '<script>alert("XSS!")</script>')),
      '&#x3C;script>alert("XSS!")&#x3C;/script>'
    )
  })

  await t.test(
    'should not encode `raw`s in `allowDangerousHtml` mode',
    async function () {
      assert.deepEqual(
        toHtml(u('raw', '<script>alert("XSS!")</script>'), {
          allowDangerousHtml: true
        }),
        '<script>alert("XSS!")</script>'
      )
    }
  )
})
