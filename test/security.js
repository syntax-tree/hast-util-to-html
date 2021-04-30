import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('security', function (t) {
  t.equal(
    toHtml(u('root', [u('comment', '--><script>alert(1)</script><!--')])),
    '<!----&#x3E;<script>alert(1)</script>&#x3C;!---->',
    'comments cannot break out of their context (safe)'
  )

  t.equal(
    toHtml(u('root', [h('script', 'alert(1)')])),
    '<script>alert(1)</script>',
    'scripts render (unsafe)'
  )

  t.equal(
    toHtml(h('img', {src: 'x', onError: 'alert(1)'})),
    '<img src="x" onerror="alert(1)">',
    'event attributes render (unsafe)'
  )

  t.equal(
    toHtml(u('root', u('text', '<script>alert(1)</script>'))),
    '&#x3C;script>alert(1)&#x3C;/script>',
    'texts are encoded (safe)'
  )

  t.end()
})
