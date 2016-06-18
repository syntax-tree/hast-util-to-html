/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

/* Dependencies. */
var test = require('tape');
var to = require('./index.js');
var h = require('hastscript');
var u = require('unist-builder');

/* Tests. */
test('toHTML()', function (t) {
    t.throws(
        function () {
            to(true)
        },
        /Expected node, not `true`/,
        'should throw on non-nodes'
    );

    t.throws(
        function () {
            to(u('foo', []))
        },
        /Cannot compile unknown node `foo`/,
        'should throw on unknown nodes'
    );

    t.test('`text`', function (st) {
        st.deepEqual(
            to(u('text', 'alpha')),
            'alpha',
            'should stringify `text`s'
        );

        st.deepEqual(
            to(u('text', 'AT&T')),
            'AT&#x26;T',
            'should encode `text`s'
        );

        st.deepEqual(
            to(h('style', u('text', '*:before {content: "AT&T"}'))),
            '<style>*:before {content: "AT&T"}</style>',
            'should not encode `text`s in `style`'
        );

        st.deepEqual(
            to(h('script', u('text', 'alert("AT&T")'))),
            '<script>alert("AT&T")</script>',
            'should not encode `text`s in `script`'
        );

        st.deepEqual(
            to(h('b', u('text', 'AT&T'))),
            '<b>AT&#x26;T</b>',
            'should encode `text`s in other nodes'
        );

        st.end();
    });

    t.test('`comment`', function (st) {
        st.deepEqual(
            to(u('comment', 'alpha')),
            '<!--alpha-->',
            'should stringify `comment`s'
        );

        st.deepEqual(
            to(u('comment', 'AT&T')),
            '<!--AT&T-->',
            'should not encode `comment`s (#1)'
        );

        /* No way to get around this. */
        st.deepEqual(
            to(u('comment', '-->')),
            '<!---->-->',
            'should not encode `comment`s (#2)'
        );

        st.end();
    });

    t.test('`characterData`', function (st) {
        st.deepEqual(
            to(u('characterData', 'alpha')),
            '<![CDATA[alpha]]>',
            'should stringify `characterData`s'
        );

        st.deepEqual(
            to(u('characterData', 'AT&T')),
            '<![CDATA[AT&T]]>',
            'should not encode `characterData`s (#1)'
        );

        /* No way to get around this. */
        st.deepEqual(
            to(u('characterData', ']]>')),
            '<![CDATA[]]>]]>',
            'should not encode `characterData`s (#2)'
        );

        st.end();
    });

    t.test('`directive`', function (st) {
        st.deepEqual(
            to(u('directive', {name: '!alpha'}, '!alpha bravo')),
            '<!alpha bravo>',
            'should stringify declaration `directive`s'
        );

        st.deepEqual(
            to(u('directive', {name: '!at&t'}, '!at&t bravo')),
            '<!at&t bravo>',
            'should not encode declaration `directive`s (#1)'
        );

        /* No way to get around this. */
        st.deepEqual(
            to(u('directive', {name: '!>'}, '!>')),
            '<!>>',
            'should not encode declaration `directive`s (#2)'
        );

        st.deepEqual(
            to(u('directive', {name: '?xml'}, '?xml version="1.0"')),
            '<?xml version="1.0">',
            'should stringify processing instruction `directive`s'
        );

        st.deepEqual(
            to(u('directive', {name: '?xml'}, '?xml version="at&t"')),
            '<?xml version="at&t">',
            'should not encode processing instruction `directive`s (#1)'
        );

        /* No way to get around this. */
        st.deepEqual(
            to(u('directive', {name: '?xml'}, '?xml>')),
            '<?xml>>',
            'should not encode processing instruction `directive`s (#2)'
        );

        st.end();
    });

    t.test('`root`', function (st) {
        st.deepEqual(
            to(u('root', [
                u('text', 'alpha '),
                h('i', 'bravo'),
                u('text', ' charlie')
            ])),
            'alpha <i>bravo</i> charlie',
            'should stringify `root`s'
        );

        st.end();
    });

    t.test('`element`', function (st) {
        st.deepEqual(
            to(h('i', 'bravo')),
            '<i>bravo</i>',
            'should stringify `element`s'
        );

        st.deepEqual(
            to(h('foo')),
            '<foo></foo>',
            'should stringify unknown `element`s'
        );

        st.deepEqual(
            to(h('img', {src: './example.jpg'})),
            '<img src="./example.jpg">',
            'should stringify void `element`s'
        );

        st.deepEqual(
            to(h('foo'), {voids: ['foo']}),
            '<foo>',
            'should stringify given void `element`s'
        );

        st.deepEqual(
            to(h('i', {
                className: ['alpha', 'charlie']
            }, 'bravo')),
            '<i class="alpha charlie">bravo</i>',
            'should stringify space-separated attributes'
        );

        st.deepEqual(
            to(h('input', {
                type: 'file',
                accept: ['jpg', 'jpeg']
            })),
            '<input type="file" accept="jpg, jpeg">',
            'should stringify comma-separated attributes'
        );

        st.deepEqual(
            to(h('span', {
                dataUnknown: ['alpha', 'bravo']
            })),
            '<span data-unknown="alpha bravo"></span>',
            'should stringify unknown lists as space-separated'
        );

        st.deepEqual(
            to(h('i', {
                hidden: true
            }, 'bravo')),
            '<i hidden>bravo</i>',
            'should stringify known boolean attributes set to `true`'
        );

        st.deepEqual(
            to(h('i', {
                hidden: false
            }, 'bravo')),
            '<i>bravo</i>',
            'should ignore known boolean attributes set to `false`'
        );

        st.deepEqual(
            to(h('i', {
                hidden: 1
            }, 'bravo')),
            '<i hidden>bravo</i>',
            'should stringify truthy known boolean attributes'
        );

        st.deepEqual(
            to(h('i', {
                hidden: 0
            }, 'bravo')),
            '<i>bravo</i>',
            'should ignore falsey known boolean attributes'
        );

        st.deepEqual(
            to(h('i', {
                dataUnknown: false
            }, 'bravo')),
            '<i data-unknown="false">bravo</i>',
            'should stringify unknown attributes set to `false`'
        );

        st.deepEqual(
            to(h('i', {
                dataUnknown: true
            }, 'bravo')),
            '<i data-unknown="true">bravo</i>',
            'should stringify unknown attributes set to `true`'
        );

        st.deepEqual(
            to(h('i', {
                cols: 1
            }, 'bravo')),
            '<i cols="1">bravo</i>',
            'should stringify positive known numeric attributes'
        );

        st.deepEqual(
            to(h('i', {
                cols: -1
            }, 'bravo')),
            '<i cols="-1">bravo</i>',
            'should stringify negative known numeric attributes'
        );

        st.deepEqual(
            to(h('i', {
                cols: 0
            }, 'bravo')),
            '<i cols="0">bravo</i>',
            'should stringify known numeric attributes set to `0`'
        );

        st.deepEqual(
            to(h('i', {
                cols: NaN
            }, 'bravo')),
            '<i>bravo</i>',
            'should ignore known numeric attributes set to `NaN`'
        );

        st.deepEqual(
            to(h('i', {
                cols: {
                    toString: function () {
                        return 'yup';
                    }
                }
            }, 'bravo')),
            '<i cols="yup">bravo</i>',
            'should stringify known numeric attributes set to non-numeric'
        );

        st.deepEqual(
            to(h('i', {
                id: 'alpha'
            }, 'bravo')),
            '<i id="alpha">bravo</i>',
            'should stringify other attributes'
        );

        st.deepEqual(
            to(h('i', {
                id: ''
            }, 'bravo')),
            '<i id="">bravo</i>',
            'should stringify other falsey attributes'
        );

        st.deepEqual(
            to(h('i', {
                id: true
            }, 'bravo')),
            '<i id="true">bravo</i>',
            'should stringify other non-string attributes'
        );

        st.deepEqual(
            to(h('i', {
                'at&t': 'alpha'
            }, 'bravo')),
            '<i at&#x26;t="alpha">bravo</i>',
            'should encode entities in attribute names'
        );

        st.deepEqual(
            to(h('i', {
                id: 'at&t'
            }, 'bravo')),
            '<i id="at&#x26;t">bravo</i>',
            'should encode entities in attribute values'
        );

        st.deepEqual(
            to(u('element', {
                tagName: 'i',
                properties: {
                    id: null
                }
            }, [u('text', 'bravo')])),
            '<i>bravo</i>',
            'should ignore attributes set to `null`'
        );

        st.deepEqual(
            to(u('element', {
                tagName: 'i',
                properties: {
                    id: undefined
                }
            }, [u('text', 'bravo')])),
            '<i>bravo</i>',
            'should ignore attributes set to `undefined`'
        );

        st.deepEqual(
            to(h('img', {
                src: 'http://example.com/image.jpg'
            }), {closeSelfClosing: true}),
            '<img src="http://example.com/image.jpg" />',
            'should encode entities in attribute values'
        );

        st.end();
    });

    t.test('`raw`', function (st) {
        st.deepEqual(
            to(u('raw', '<script>alert("XSS!")</script>')),
            '&#x3C;script&#x3E;alert(&#x22;XSS!&#x22;)&#x3C;/script&#x3E;',
            'should encode `raw`s'
        );

        st.deepEqual(
            to(u('raw', '<script>alert("XSS!")</script>'), {
                allowDangerousHTML: true
            }),
            '<script>alert("XSS!")</script>',
            'should not encode `raw`s in `allowDangerousHTML` mode'
        );

        st.end();
    });

    t.end();
});
