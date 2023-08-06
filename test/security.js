import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('security', async function (t) {
  await t.test(
    'should make sure comments cannot break out of their context (safe)',
    async function () {
      assert.equal(
        toHtml(u('root', [u('comment', '--><script>alert(1)</script><!--')])),
        '<!----&#x3E;<script>alert(1)</script>&#x3C;!---->'
      )
    }
  )

  await t.test('should make sure scripts render (unsafe)', async function () {
    assert.equal(
      toHtml(u('root', [h('script', 'alert(1)')])),
      '<script>alert(1)</script>'
    )
  })

  await t.test(
    'should make sure event attributes render (unsafe)',
    async function () {
      assert.equal(
        toHtml(h('img', {src: 'x', onError: 'alert(1)'})),
        '<img src="x" onerror="alert(1)">'
      )
    }
  )

  await t.test('should make sure texts are encoded (safe)', async function () {
    assert.equal(
      toHtml(u('root', u('text', '<script>alert(1)</script>'))),
      '&#x3C;script>alert(1)&#x3C;/script>'
    )
  })
})
