import assert from 'node:assert/strict'
import test from 'node:test'
import {h, s} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('svg', async function (t) {
  await t.test('should serialize `element`s', async function () {
    assert.deepEqual(toHtml(s('path'), {space: 'svg'}), '<path></path>')
  })

  await t.test('should serialize unknown `element`s', async function () {
    assert.deepEqual(toHtml(s('foo'), {space: 'svg'}), '<foo></foo>')
  })

  await t.test('should serialize `element`s with content', async function () {
    assert.deepEqual(
      toHtml(s('g', s('circle')), {space: 'svg'}),
      '<g><circle></circle></g>'
    )
  })

  await t.test(
    'should serialize with ` /` in `closeEmptyElements` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('circle'), {space: 'svg', closeEmptyElements: true}),
        '<circle />'
      )
    }
  )

  await t.test(
    'should serialize empties with `/` in `closeEmptyElements` and `tightSelfClosing` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('circle'), {
          space: 'svg',
          closeEmptyElements: true,
          tightSelfClosing: true
        }),
        '<circle/>'
      )
    }
  )

  await t.test(
    'should serialize empties with `/` in `closeEmptyElements` and `tightSelfClosing` mode, *with* a space after an unquoted attribute',
    async function () {
      // `<circle cx=2 cy=2 r=1/>` does not work in browsers.  Needs a space.
      assert.deepEqual(
        toHtml(
          s('svg', {viewBox: '0 0 4 4'}, s('circle', {cx: 2, cy: 2, r: 1})),
          {
            preferUnquoted: true,
            closeEmptyElements: true,
            tightSelfClosing: true
          }
        ),
        '<svg viewBox="0 0 4 4"><circle cx=2 cy=2 r=1 /></svg>'
      )
    }
  )

  await t.test('should serialize properties', async function () {
    assert.deepEqual(
      toHtml(s('text', {dataFoo: 'alpha'}, 'bravo')),
      '<text data-foo="alpha">bravo</text>'
    )
  })

  await t.test('should serialize special properties', async function () {
    assert.deepEqual(
      toHtml(s('text', {className: ['alpha']}, 'bravo'), {space: 'svg'}),
      '<text class="alpha">bravo</text>'
    )
  })

  await t.test(
    'should collapse empty string attributes in `collapseEmptyAttributes` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {title: ''}), {
          space: 'svg',
          collapseEmptyAttributes: true
        }),
        '<circle title></circle>'
      )
    }
  )

  await t.test('should serialize multiple properties', async function () {
    assert.deepEqual(
      toHtml(s('text', {className: ['a', 'b'], title: 'c d'}, 'bravo'), {
        space: 'svg'
      }),
      '<text class="a b" title="c d">bravo</text>'
    )
  })

  await t.test(
    'should serialize multiple properties tightly in `tightAttributes` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('text', {className: ['a', 'b'], title: 'c d'}, 'bravo'), {
          space: 'svg',
          tightAttributes: true
        }),
        '<text class="a b"title="c d">bravo</text>'
      )
    }
  )

  await t.test(
    'should serialize space-separated attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('text', {className: ['alpha', 'charlie']}, 'bravo'), {
          space: 'svg'
        }),
        '<text class="alpha charlie">bravo</text>'
      )
    }
  )

  await t.test(
    'should serialize comma-separated attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('glyph', {glyphName: ['foo', 'bar']}), {space: 'svg'}),
        '<glyph glyph-name="foo, bar"></glyph>'
      )
    }
  )

  await t.test(
    'should serialize comma-separated attributes tighly in `tightCommaSeparatedLists` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('glyph', {glyphName: ['foo', 'bar']}), {
          tightCommaSeparatedLists: true,
          space: 'svg'
        }),
        '<glyph glyph-name="foo,bar"></glyph>'
      )
    }
  )

  await t.test(
    'should serialize unknown lists as space-separated',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {unknown: ['alpha', 'bravo']}), {space: 'svg'}),
        '<circle unknown="alpha bravo"></circle>'
      )
    }
  )

  await t.test(
    'should serialize known boolean attributes set to `true`',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {download: true}, 'bravo'), {space: 'svg'}),
        '<a download>bravo</a>'
      )
    }
  )

  await t.test(
    'should ignore known boolean attributes set to `false`',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {download: false}, 'bravo'), {space: 'svg'}),
        '<a>bravo</a>'
      )
    }
  )

  await t.test(
    'should serialize truthy known boolean attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {download: 1}, 'bravo'), {space: 'svg'}),
        '<a download>bravo</a>'
      )
    }
  )

  await t.test(
    'should ignore falsey known boolean attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {download: 0}, 'bravo'), {space: 'svg'}),
        '<a>bravo</a>'
      )
    }
  )

  await t.test(
    'should ignore unknown attributes set to `false`',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {unknown: false}, 'bravo'), {space: 'svg'}),
        '<a>bravo</a>'
      )
    }
  )

  await t.test(
    'should serialize unknown attributes set to `true`',
    async function () {
      assert.deepEqual(
        toHtml(s('a', {unknown: true}, 'bravo'), {space: 'svg'}),
        '<a unknown>bravo</a>'
      )
    }
  )

  await t.test(
    'should serialize positive known numeric attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('path', {strokeOpacity: 0.7}), {space: 'svg'}),
        '<path stroke-opacity="0.7"></path>'
      )
    }
  )

  await t.test(
    'should serialize negative known numeric attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('path', {strokeMiterLimit: -1}), {space: 'svg'}),
        '<path stroke-miterlimit="-1"></path>'
      )
    }
  )

  await t.test(
    'should serialize known numeric attributes set to `0`',
    async function () {
      assert.deepEqual(
        toHtml(s('path', {strokeOpacity: 0}), {space: 'svg'}),
        '<path stroke-opacity="0"></path>'
      )
    }
  )

  await t.test(
    'should ignore known numeric attributes set to `NaN`',
    async function () {
      assert.deepEqual(
        toHtml(s('path', {strokeOpacity: Number.NaN}), {space: 'svg'}),
        '<path></path>'
      )
    }
  )

  await t.test(
    'should serialize known numeric attributes set to non-numeric values',
    async function () {
      assert.deepEqual(
        // @ts-expect-error: check how the runtime handles a `toString` method on an object.
        toHtml(s('path', {strokeOpacity: {toString}}), {space: 'svg'}),
        '<path stroke-opacity="yup"></path>'
      )
    }
  )

  await t.test('should serialize other attributes', async function () {
    assert.deepEqual(
      toHtml(s('svg', {viewBox: '0 0 10 10'}), {space: 'svg'}),
      '<svg viewBox="0 0 10 10"></svg>'
    )
  })

  await t.test('should serialize other falsey attributes', async function () {
    assert.deepEqual(
      toHtml(s('svg', {viewBox: ''}), {space: 'svg'}),
      '<svg viewBox=""></svg>'
    )
  })

  await t.test(
    'should serialize other non-string attributes',
    async function () {
      assert.deepEqual(
        toHtml(s('i', {id: true}, 'bravo'), {space: 'svg'}),
        '<i id>bravo</i>'
      )
    }
  )

  await t.test(
    'should quote attribute values with single quotes if `quote: "\'"`',
    async function () {
      assert.deepEqual(
        toHtml(s('svg', {viewBox: '0 0 10 10'}), {space: 'svg', quote: "'"}),
        "<svg viewBox='0 0 10 10'></svg>"
      )
    }
  )

  await t.test(
    "should quote attribute values with double quotes if `quote: '\"'`",
    async function () {
      assert.deepEqual(
        toHtml(s('svg', {viewBox: '0 0 10 10'}), {space: 'svg', quote: '"'}),
        '<svg viewBox="0 0 10 10"></svg>'
      )
    }
  )

  await t.test(
    'should quote smartly if the other quote is less prominent (#1)',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {title: '"some \' stuff"'}), {
          space: 'svg',
          quote: '"',
          quoteSmart: true
        }),
        "<circle title='&#x22;some &#x27; stuff&#x22;'></circle>"
      )
    }
  )

  await t.test(
    'should quote smartly if the other quote is less prominent (#2)',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {title: "'some \" stuff'"}), {
          space: 'svg',
          quote: '"',
          quoteSmart: true
        }),
        '<circle title="&#x27;some &#x22; stuff&#x27;"></circle>'
      )
    }
  )

  await t.test('should omit quotes in `preferUnquoted`', async function () {
    assert.deepEqual(
      toHtml(s('circle', {cx: 2}), {space: 'svg', preferUnquoted: true}),
      '<circle cx=2></circle>'
    )
  })

  await t.test('should encode entities in attribute names', async function () {
    assert.deepEqual(
      toHtml(s('circle', {'3<5\0': 'alpha'}), {space: 'svg'}),
      '<circle 3&#x3C;5&#x0;="alpha"></circle>'
    )
  })

  await t.test('should encode entities in attribute values', async function () {
    assert.deepEqual(
      toHtml(s('circle', {title: '3<5\0'}), {space: 'svg'}),
      '<circle title="3<5&#x0;"></circle>'
    )
  })

  await t.test(
    'should encode characters in attribute names which cause parse errors, work, even though `allowParseErrors` mode is on',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {'3=5\0': 'alpha'}), {
          space: 'svg',
          allowParseErrors: true
        }),
        '<circle 3&#x3D;5&#x0;="alpha"></circle>'
      )
    }
  )

  await t.test(
    'should encode characters in attribute values which cause parse errors, work, even though `allowParseErrors` mode is on',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {title: '3"5\0'}), {
          space: 'svg',
          allowParseErrors: true
        }),
        '<circle title="3&#x22;5&#x0;"></circle>'
      )
    }
  )

  await t.test(
    'should not encode characters which cause XSS issues in older browsers, in `allowDangerousCharacters` mode',
    async function () {
      assert.deepEqual(
        toHtml(s('circle', {title: "3'5"}), {
          space: 'svg',
          allowDangerousCharacters: true
        }),
        '<circle title="3\'5"></circle>'
      )
    }
  )

  await t.test('should ignore attributes set to `null`', async function () {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'circle', properties: {id: null}}, [])),
      '<circle></circle>'
    )
  })

  await t.test(
    'should ignore attributes set to `undefined`',
    async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'circle', properties: {id: undefined}}, [])
        ),
        '<circle></circle>'
      )
    }
  )

  await t.test('should serialize an SVG tree', async function () {
    assert.deepEqual(
      toHtml(
        s(
          'svg',
          {
            xlmns: 'http://www.w3.org/2000/svg',
            xmlnsXLink: 'http://www.w3.org/1999/xlink',
            width: 500,
            height: 500,
            viewBox: [0, 0, 500, 500]
          },
          [
            s('title', 'SVG `<circle>` element'),
            s('circle', {cx: 120, cy: 120, r: 100})
          ]
        ),
        {space: 'svg'}
      ),
      [
        '<svg xlmns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="500" viewBox="0 0 500 500">',
        '<title>SVG `&#x3C;circle>` element</title>',
        '<circle cx="120" cy="120" r="100"></circle>',
        '</svg>'
      ].join('')
    )
  })

  await t.test(
    'should serialize SVG props on an `svg` element in HTML',
    async function () {
      assert.deepEqual(
        toHtml(
          h('div', [
            s(
              'svg',
              {
                xlmns: 'http://www.w3.org/2000/svg',
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                viewBox: [0, 0, 8, 8]
              },
              [s('path', {stroke: 'blue', d: 'M0 6V3h1l1 1v2'})]
            )
          ])
        ),
        '<div><svg xlmns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 8 8"><path stroke="blue" d="M0 6V3h1l1 1v2"></path></svg></div>'
      )
    }
  )

  await t.test(
    'should serialize an HTML tree with embedded HTML',
    async function () {
      assert.deepEqual(
        toHtml(
          u('root', [
            u('doctype', {name: 'html'}),
            h('head', h('title', 'The SVG `<circle>` element')),
            h('body', [
              s(
                'svg',
                {
                  xlmns: 'http://www.w3.org/2000/svg',
                  viewbox: [0, 0, 500, 500]
                },
                s('circle', {cx: 120, cy: 120, r: 100})
              )
            ])
          ])
        ),
        [
          '<!doctype html>',
          '<head><title>The SVG `&#x3C;circle>` element</title></head>',
          '<body>',
          '<svg xlmns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">',
          '<circle cx="120" cy="120" r="100"></circle>',
          '</svg>',
          '</body>'
        ].join('')
      )
    }
  )
})

function toString() {
  return 'yup'
}
