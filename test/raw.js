/**
 * @typedef {import('hast-util-raw')}
 */

import test from 'tape'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`element`', (t) => {
  t.deepEqual(
    toHtml(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  )

  t.deepEqual(
    toHtml(u('raw', '<script>alert("XSS!")</script>'), {
      allowDangerousHtml: true
    }),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousHtml` mode'
  )

  t.end()
})
