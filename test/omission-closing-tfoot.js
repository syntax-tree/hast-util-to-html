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
var to = require('..');

/* Tests. */
test('`tfoot` (closing)', function (t) {
  t.deepEqual(
    to(h('tfoot'), {omitOptionalTags: true}),
    '<tfoot>',
    'should omit tag without siblings'
  );

  t.deepEqual(
    to(h('table', h('tfoot')), {omitOptionalTags: true}),
    '<table><tfoot></table>',
    'should omit tag without following'
  );

  t.deepEqual(
    to(h('table', [h('tfoot'), h('tr')]), {omitOptionalTags: true}),
    '<table><tfoot></tfoot><tr></table>',
    'should not omit tag followed by others'
  );

  t.end();
});
