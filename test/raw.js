import test from 'tape'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`element`', function (t) {
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

  t.deepEqual(
    toHtml(u('raw', '<script>alert("XSS!")</script>'), {
      allowDangerousHTML: true
    }),
    '<script>alert("XSS!")</script>',
    'should support the legacy `allowDangerousHTML` (#1)'
  )
  t.deepEqual(
    toHtml(u('raw', '<script>alert("XSS!")</script>'), {
      allowDangerousHTML: true
    }),
    '<script>alert("XSS!")</script>',
    'should support the legacy `allowDangerousHTML` (#2)'
  )

  t.end()
})
