import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
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
        toHtml(
          h('div', [
            h('iframe', [{type: 'text', value: '<b>3 < 5</b> &amp;'}]),
            h('noembed', [{type: 'text', value: '<b>3 < 5</b> &amp;'}]),
            h('noframes', [{type: 'text', value: '<b>3 < 5</b> &amp;'}]),
            h('xmp', [{type: 'text', value: '<b>3 < 5</b> &amp;'}]),
            h('plaintext', [{type: 'text', value: '<b>3 < 5</b> &amp;'}])
          ])
        ),
        '<div><iframe><b>3 < 5</b> &amp;</iframe><noembed><b>3 < 5</b> &amp;</noembed><noframes><b>3 < 5</b> &amp;</noframes><xmp><b>3 < 5</b> &amp;</xmp><plaintext><b>3 < 5</b> &amp;</plaintext></div>'
      )
    }
  )

  await t.test(
    'should encode `text`s in other raw text elements if they would close the element',
    async function () {
      assert.equal(
        toHtml(
          h('xmp', [{type: 'text', value: '</XMP><script>alert(1)</script>'}])
        ),
        '<xmp>&#x3C;/XMP>&#x3C;script>alert(1)&#x3C;/script></xmp>'
      )
    }
  )

  await t.test(
    'should encode `text`s in other raw text elements if together they would close the element',
    async function () {
      assert.equal(
        toHtml(
          h('iframe', [
            {type: 'text', value: '</'},
            {type: 'text', value: 'iframe><script>alert(1)</script>'}
          ])
        ),
        '<iframe>&#x3C;/iframe>&#x3C;script>alert(1)&#x3C;/script></iframe>'
      )
    }
  )

  await t.test(
    'should encode `text`s in other raw text elements next to other nodes',
    async function () {
      assert.equal(
        toHtml(
          h('noembed', [
            {type: 'text', value: '</'},
            h('b', 'noembed'),
            {type: 'text', value: ' 3 < 5'}
          ])
        ),
        '<noembed>&#x3C;/<b>noembed</b> 3 &#x3C; 5</noembed>'
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
