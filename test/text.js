import assert from 'node:assert/strict'
import test from 'node:test'
import {h, s} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`text`', async function (t) {
  await t.test('should serialize `text`s', async function () {
    assert.equal(toHtml({type: 'text', value: 'alpha'}), 'alpha')
  })

  await t.test('should encode `text`s', async function () {
    assert.equal(
      toHtml({type: 'text', value: '3 < 5 & 7'}),
      '3 &#x3C; 5 &#x26; 7'
    )
  })

  await t.test('should not encode `text`s in `style`', async function () {
    assert.equal(
      toHtml(
        h('style', [{type: 'text', value: '*:before {content: "3 < 5"}'}])
      ),
      '<style>*:before {content: "3 < 5"}</style>'
    )
  })

  await t.test('should not encode `text`s in `script`', async function () {
    assert.equal(
      toHtml(h('script', [{type: 'text', value: 'alert("3 < 5")'}])),
      '<script>alert("3 < 5")</script>'
    )
  })

  await t.test(
    'should not encode `text`s in other raw text elements',
    async function () {
      assert.equal(
        toHtml([
          h('iframe', '<&'),
          h('noembed', '<&'),
          h('noframes', '<&'),
          h('plaintext', '<&'),
          h('xmp', '<&')
        ]),
        '<iframe><&</iframe><noembed><&</noembed><noframes><&</noframes><plaintext><&</plaintext><xmp><&</xmp>'
      )
    }
  )

  await t.test('should encode `text`s in `noscript`', async function () {
    assert.equal(
      toHtml(h('noscript', '<&')),
      '<noscript>&#x3C;&#x26;</noscript>'
    )
  })

  await t.test('should encode `text`s in SVG `style`', async function () {
    assert.equal(
      toHtml(s('svg', [s('style', '<&')])),
      '<svg><style>&#x3C;&#x26;</style></svg>'
    )
  })

  await t.test(
    'should not encode `text`s in HTML `style` in SVG',
    async function () {
      assert.equal(
        toHtml(s('svg', [s('foreignObject', [h('style', '<&')])])),
        '<svg><foreignObject><style><&</style></foreignObject></svg>'
      )
    }
  )

  await t.test('should encode `text`s in other nodes', async function () {
    assert.equal(
      toHtml(h('b', [{type: 'text', value: '3 < 5'}])),
      '<b>3 &#x3C; 5</b>'
    )
  })
})
