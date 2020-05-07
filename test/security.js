'use strict'

var test = require('tape')
var h = require('hastscript')
var u = require('unist-builder')
var to = require('..')

test('security', function (t) {
  t.equal(
    to(u('root', [u('comment', '--><script>alert(1)</script><!--')])),
    '<!----&#x3E;<script>alert(1)</script>&#x3C;!---->',
    'comments cannot break out of their context (safe)'
  )

  t.equal(
    to(u('root', [h('script', 'alert(1)')])),
    '<script>alert(1)</script>',
    'scripts render (unsafe)'
  )

  t.equal(
    to(h('img', {src: 'x', onError: 'alert(1)'})),
    '<img src="x" onerror="alert(1)">',
    'event attributes render (unsafe)'
  )

  t.equal(
    to(u('root', u('text', '<script>alert(1)</script>'))),
    '&#x3C;script>alert(1)&#x3C;/script>',
    'texts are encoded (safe)'
  )

  t.end()
})
