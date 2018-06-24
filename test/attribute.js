'use strict'

var test = require('tape')
var h = require('hastscript')
var u = require('unist-builder')
var to = require('..')

test('`element` attributes', function(t) {
  t.deepEqual(
    to(h('i', {className: ['alpha']}, 'bravo')),
    '<i class="alpha">bravo</i>',
    'should stringify special camel-cased properties'
  )

  t.deepEqual(
    to(h('i', {dataFoo: 'alpha'}, 'bravo')),
    '<i data-foo="alpha">bravo</i>',
    'should stringify camel-cased properties'
  )

  t.deepEqual(
    to(h('i', {data123: 'alpha'}, 'bravo')),
    '<i data-123="alpha">bravo</i>',
    'should stringify numeric `data-` properties'
  )

  t.deepEqual(
    to(h('img', {alt: ''})),
    '<img alt="">',
    'should show empty string attributes'
  )

  t.deepEqual(
    to(h('img', {alt: ''}), {collapseEmptyAttributes: true}),
    '<img alt>',
    'should collapse empty string attributes in `collapseEmptyAttributes` mode'
  )

  t.deepEqual(
    to(h('i', {className: ['a', 'b'], title: 'c d'}, 'bravo')),
    '<i class="a b" title="c d">bravo</i>',
    'should stringify multiple properties'
  )

  t.deepEqual(
    to(h('i', {className: ['a', 'b'], title: 'c d'}, 'bravo'), {
      tightAttributes: true
    }),
    '<i class="a b"title="c d">bravo</i>',
    'should stringify multiple properties tightly in `tightAttributes` mode'
  )

  t.deepEqual(
    to(h('i', {className: ['alpha', 'charlie']}, 'bravo')),
    '<i class="alpha charlie">bravo</i>',
    'should stringify space-separated attributes'
  )

  t.deepEqual(
    to(h('input', {type: 'file', accept: ['jpg', 'jpeg']})),
    '<input type="file" accept="jpg, jpeg">',
    'should stringify comma-separated attributes'
  )

  t.deepEqual(
    to(h('input', {type: 'file', accept: ['jpg', 'jpeg']}), {
      tightCommaSeparatedLists: true
    }),
    '<input type="file" accept="jpg,jpeg">',
    'should stringify comma-separated attributes tighly in `tightCommaSeparatedLists` mode'
  )

  t.deepEqual(
    to(h('span', {dataUnknown: ['alpha', 'bravo']})),
    '<span data-unknown="alpha bravo"></span>',
    'should stringify unknown lists as space-separated'
  )

  t.deepEqual(
    to(h('i', {hidden: true}, 'bravo')),
    '<i hidden>bravo</i>',
    'should stringify known boolean attributes set to `true`'
  )

  t.deepEqual(
    to(h('i', {hidden: false}, 'bravo')),
    '<i>bravo</i>',
    'should ignore known boolean attributes set to `false`'
  )

  t.deepEqual(
    to(h('i', {hidden: 1}, 'bravo')),
    '<i hidden>bravo</i>',
    'should stringify truthy known boolean attributes'
  )

  t.deepEqual(
    to(h('i', {hidden: 0}, 'bravo')),
    '<i>bravo</i>',
    'should ignore falsey known boolean attributes'
  )

  t.deepEqual(
    to(h('i', {dataUnknown: false}, 'bravo')),
    '<i data-unknown="false">bravo</i>',
    'should stringify unknown attributes set to `false`'
  )

  t.deepEqual(
    to(h('i', {dataUnknown: true}, 'bravo')),
    '<i data-unknown="true">bravo</i>',
    'should stringify unknown attributes set to `true`'
  )

  t.deepEqual(
    to(h('i', {cols: 1}, 'bravo')),
    '<i cols="1">bravo</i>',
    'should stringify positive known numeric attributes'
  )

  t.deepEqual(
    to(h('i', {cols: -1}, 'bravo')),
    '<i cols="-1">bravo</i>',
    'should stringify negative known numeric attributes'
  )

  t.deepEqual(
    to(h('i', {cols: 0}, 'bravo')),
    '<i cols="0">bravo</i>',
    'should stringify known numeric attributes set to `0`'
  )

  t.deepEqual(
    to(h('i', {cols: NaN}, 'bravo')),
    '<i>bravo</i>',
    'should ignore known numeric attributes set to `NaN`'
  )

  t.deepEqual(
    to(
      h(
        'i',
        {
          cols: {
            toString: function() {
              return 'yup'
            }
          }
        },
        'bravo'
      )
    ),
    '<i cols="yup">bravo</i>',
    'should stringify known numeric attributes set to non-numeric'
  )

  t.deepEqual(
    to(h('i', {id: 'alpha'}, 'bravo')),
    '<i id="alpha">bravo</i>',
    'should stringify other attributes'
  )

  t.deepEqual(
    to(h('i', {id: ''}, 'bravo')),
    '<i id="">bravo</i>',
    'should stringify other falsey attributes'
  )

  t.deepEqual(
    to(h('i', {id: true}, 'bravo')),
    '<i id="true">bravo</i>',
    'should stringify other non-string attributes'
  )

  t.deepEqual(
    to(h('img', {alt: ''}), {quote: "'"}),
    "<img alt=''>",
    'should quote attribute values with single quotes is `quote: "\'"`'
  )

  t.throws(
    function() {
      to(h('img'), {quote: '`'})
    },
    /Invalid quote ```, expected `'` or `"`/,
    'should throw on invalid quotes'
  )

  t.deepEqual(
    to(h('img', {alt: ''}), {quote: '"'}),
    '<img alt="">',
    "should quote attribute values with single quotes is `quote: '\"'`"
  )

  t.deepEqual(
    to(h('img', {alt: '"some \' stuff"'}), {
      quote: '"',
      quoteSmart: true
    }),
    "<img alt='&#x22;some &#x27; stuff&#x22;'>",
    'should quote smartly if the other quote is less prominent (#1)'
  )

  t.deepEqual(
    to(h('img', {alt: "'some \" stuff'"}), {quote: "'", quoteSmart: true}),
    '<img alt="&#x27;some &#x22; stuff&#x27;">',
    'should quote smartly if the other quote is less prominent (#2)'
  )

  t.deepEqual(
    to(h('img', {alt: 'alpha'}), {preferUnquoted: true}),
    '<img alt=alpha>',
    'should omit quotes in `preferUnquoted`'
  )

  t.deepEqual(
    to(h('img', {alt: 'alpha bravo'}), {preferUnquoted: true}),
    '<img alt="alpha bravo">',
    'should keep quotes in `preferUnquoted` and impossible'
  )

  t.deepEqual(
    to(h('img', {alt: ''}), {preferUnquoted: true}),
    '<img alt>',
    'should not add `=` when omitting quotes on empty values'
  )

  t.deepEqual(
    to(h('i', {'3<5\0': 'alpha'})),
    '<i 3&#x3C;5&#x0;="alpha"></i>',
    'should encode entities in attribute names'
  )

  t.deepEqual(
    to(h('i', {title: '3<5\0'})),
    '<i title="3<5&#x0;"></i>',
    'should encode entities in attribute values'
  )

  t.deepEqual(
    to(h('i', {'3=5\0': 'alpha'}), {allowParseErrors: true}),
    '<i 3&#x3D;5\0="alpha"></i>',
    'should not encode characters in attribute names which cause parse errors, but work, in `allowParseErrors` mode'
  )

  t.deepEqual(
    to(h('i', {title: '3"5\0'}), {allowParseErrors: true}),
    '<i title="3&#x22;5\0"></i>',
    'should not encode characters in attribute values which cause parse errors, but work, in `allowParseErrors` mode'
  )

  t.deepEqual(
    to(h('i', {title: "3'5"}), {allowDangerousCharacters: true}),
    '<i title="3\'5"></i>',
    'should not encode characters which cause XSS issues in older browsers, in `allowParseErrors` mode'
  )

  t.deepEqual(
    to(
      u(
        'element',
        {
          tagName: 'i',
          properties: {id: null}
        },
        [u('text', 'bravo')]
      )
    ),
    '<i>bravo</i>',
    'should ignore attributes set to `null`'
  )

  t.deepEqual(
    to(
      u(
        'element',
        {
          tagName: 'i',
          properties: {id: undefined}
        },
        [u('text', 'bravo')]
      )
    ),
    '<i>bravo</i>',
    'should ignore attributes set to `undefined`'
  )

  t.end()
})
