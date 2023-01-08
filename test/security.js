import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('security', () => {
  assert.equal(
    toHtml(u('root', [u('comment', '--><script>alert(1)</script><!--')])),
    '<!----&#x3E;<script>alert(1)</script>&#x3C;!---->',
    'comments cannot break out of their context (safe)'
  )

  assert.equal(
    toHtml(u('root', [h('script', 'alert(1)')])),
    '<script>alert(1)</script>',
    'scripts render (unsafe)'
  )

  assert.equal(
    toHtml(h('img', {src: 'x', onError: 'alert(1)'})),
    '<img src="x" onerror="alert(1)">',
    'event attributes render (unsafe)'
  )

  assert.equal(
    toHtml(u('root', u('text', '<script>alert(1)</script>'))),
    '&#x3C;script>alert(1)&#x3C;/script>',
    'texts are encoded (safe)'
  )
})
