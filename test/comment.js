import assert from 'node:assert/strict'
import test from 'node:test'
import {toHtml} from 'hast-util-to-html'

test('`comment`', async function (t) {
  await t.test('should serialize `comment`s', async function () {
    assert.deepEqual(toHtml({type: 'comment', value: 'alpha'}), '<!--alpha-->')
  })

  await t.test('should not encode `comment`s', async function () {
    assert.deepEqual(toHtml({type: 'comment', value: 'AT&T'}), '<!--AT&T-->')
  })

  await t.test(
    'should serialize bogus comments (`bogusComments`)',
    async function () {
      assert.deepEqual(
        toHtml({type: 'comment', value: 'asd'}, {bogusComments: true}),
        '<?asd>'
      )
    }
  )

  await t.test(
    'should prevent breaking out of bogus comments (`bogusComments`)',
    async function () {
      assert.deepEqual(
        toHtml({type: 'comment', value: 'a<s>d'}, {bogusComments: true}),
        '<?a<s&#x3E;d>'
      )
    }
  )

  // https://html.spec.whatwg.org/multipage/syntax.html#comments
  // Optionally, text, with the additional restriction that the text must not
  // start with the string `>`, nor start with the string `->`, nor contain the
  // strings `<!--`, `-->`, or `--!>`, nor end with the string `<!-`.
  /** @type {Array<[input: string, output?: string]>} */
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

  for (const [open, close] of matrix) {
    await t.test(
      'should ' +
        (close === undefined ? 'allow' : 'prevent') +
        ' `' +
        open +
        '` (security)',
      async function () {
        assert.deepEqual(
          toHtml({type: 'comment', value: open}),
          '<!--' + (close || open) + '-->'
        )
      }
    )
  }
})
