'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`element`', function (t) {
  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  )

  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>'), {allowDangerousHtml: true}),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousHtml` mode'
  )

  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>'), {allowDangerousHTML: true}),
    '<script>alert("XSS!")</script>',
    'should support the legacy `allowDangerousHTML` (#1)'
  )
  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>'), {allowDangerousHTML: true}),
    '<script>alert("XSS!")</script>',
    'should support the legacy `allowDangerousHTML` (#2)'
  )

  t.end()
})
