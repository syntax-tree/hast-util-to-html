/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var h = require('hastscript');
var u = require('unist-builder');
var to = require('..');

/* Tests. */
test('`html` (closing)', function (t) {
  t.deepEqual(
    to(h('html'), {omitOptionalTags: true}),
    '',
    'should omit tag without following'
  );

  t.deepEqual(
    to(u('root', [h('html'), u('comment', 'alpha')]), {omitOptionalTags: true}),
    '</html><!--alpha-->',
    'should not omit tag if followed by `comment`'
  );

  t.deepEqual(
    to(u('root', [h('html'), u('text', 'alpha')]), {omitOptionalTags: true}),
    'alpha',
    'should omit tag if not followed by `comment`'
  );

  t.end();
});
