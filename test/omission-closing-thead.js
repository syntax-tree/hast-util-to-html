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
test('`thead` (closing)', function (t) {
  t.deepEqual(
    to(h('thead'), {omitOptionalTags: true}),
    '<thead></thead>',
    'should not omit tag without siblings'
  );

  t.deepEqual(
    to(h('table', h('thead')), {omitOptionalTags: true}),
    '<table><thead></thead></table>',
    'should not omit tag without following'
  );

  t.deepEqual(
    to(h('table', [h('thead'), h('tbody')]), {omitOptionalTags: true}),
    '<table><thead><tbody></table>',
    'should omit tag followed by `tbody`'
  );

  t.deepEqual(
    to(h('table', [h('thead'), h('tfoot')]), {omitOptionalTags: true}),
    '<table><thead><tfoot></table>',
    'should omit tag followed by `tfoot`'
  );

  t.deepEqual(
    to(h('table', [h('thead'), h('tr')]), {omitOptionalTags: true}),
    '<table><thead></thead><tr></table>',
    'should not omit tag followed by others'
  );

  t.end();
});
