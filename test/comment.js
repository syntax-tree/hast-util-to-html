import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`comment`', async function (t) {
  await t.test('should serialize `comment`s', async function () {
    assert.deepEqual(toHtml(u('comment', 'alpha')), '<!--alpha-->')
  })

  await t.test('should not encode `comment`s', async function () {
    assert.deepEqual(toHtml(u('comment', 'AT&T')), '<!--AT&T-->')
  })

  await t.test(
    'should serialize bogus comments (`bogusComments`)',
    async function () {
      assert.deepEqual(
        toHtml(u('comment', 'asd'), {bogusComments: true}),
        '<?asd>'
      )
    }
  )

  await t.test(
    'should prevent breaking out of bogus comments (`bogusComments`)',
    async function () {
      assert.deepEqual(
        toHtml(u('comment', 'a<s>d'), {bogusComments: true}),
        '<?a<s&#x3E;d>'
      )
    }
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
    await t.test(
      'should ' +
        (matrix[index][1] === undefined ? 'allow' : 'prevent') +
        ' `' +
        matrix[index][0] +
        '` (security)',
      async function () {
        assert.deepEqual(
          toHtml(u('comment', matrix[index][0])),
          '<!--' + (matrix[index][1] || matrix[index][0]) + '-->'
        )
      }
    )
  }
})
