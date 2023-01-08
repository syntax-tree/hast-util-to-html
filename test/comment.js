import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`comment`', () => {
  assert.deepEqual(
    toHtml(u('comment', 'alpha')),
    '<!--alpha-->',
    'should serialize `comment`s'
  )

  assert.deepEqual(
    toHtml(u('comment', 'AT&T')),
    '<!--AT&T-->',
    'should not encode `comment`s'
  )

  assert.deepEqual(
    toHtml(u('comment', 'asd'), {bogusComments: true}),
    '<?asd>',
    '`bogusComments`: should serialize bogus comments'
  )

  assert.deepEqual(
    toHtml(u('comment', 'a<s>d'), {bogusComments: true}),
    '<?a<s&#x3E;d>',
    '`bogusComments`: should prevent breaking out of bogus comments'
  )

  // https://html.spec.whatwg.org/multipage/syntax.html#comments
  // Optionally, text, with the additional restriction that the text must not
  // start with the string `>`, nor start with the string `->`, nor contain the
  // strings `<!--`, `-->`, or `--!>`, nor end with the string `<!-`.
  const matrix = [
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
  let index = -1

  while (++index < matrix.length) {
    assert.deepEqual(
      toHtml(u('comment', matrix[index][0])),
      '<!--' + (matrix[index][1] || matrix[index][0]) + '-->',
      'security: should ' +
        (matrix[index][1] === undefined ? 'allow' : 'prevent') +
        ' `' +
        matrix[index][0] +
        '`'
    )
  }
})
