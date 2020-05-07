'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`comment`', function (t) {
  t.deepEqual(
    to(u('comment', 'alpha')),
    '<!--alpha-->',
    'should serialize `comment`s'
  )

  t.deepEqual(
    to(u('comment', 'AT&T')),
    '<!--AT&T-->',
    'should not encode `comment`s'
  )

  t.deepEqual(
    to(u('comment', 'asd'), {bogusComments: true}),
    '<?asd>',
    '`bogusComments`: should serialize bogus comments'
  )

  t.deepEqual(
    to(u('comment', 'a<s>d'), {bogusComments: true}),
    '<?a<s&#x3E;d>',
    '`bogusComments`: should prevent breaking out of bogus comments'
  )

  // https://html.spec.whatwg.org/multipage/syntax.html#comments
  // Optionally, text, with the additional restriction that the text must not
  // start with the string `>`, nor start with the string `->`, nor contain the
  // strings `<!--`, `-->`, or `--!>`, nor end with the string `<!-`.
  var matrix = [
    ['>a', '&#x3E;a'],
    ['->a', '-&#x3E;a'],
    ['a<!--b', 'a&#x3C;!--b'],
    ['a-->b', 'a--&#x3E;b'],
    ['a--!>b', 'a--!&#x3E;b'],
    ['a<!-', 'a&#x3C;!-'],
    // Not at start:
    ['a>'],
    ['a->'],
    // Not at end:
    ['a<!-b']
  ]

  matrix.forEach(function (d) {
    var input = d[0]
    var output = d[1] || d[0]
    var ok = d[1] === undefined

    t.deepEqual(
      to(u('comment', input)),
      '<!--' + output + '-->',
      'security: should ' + (ok ? 'allow' : 'prevent') + ' `' + input + '`'
    )
  })

  t.end()
})
