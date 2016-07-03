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
test('`option` (closing)', function (t) {
  t.deepEqual(
    to(h('option'), {omitOptionalTags: true}),
    '<option>',
    'should omit tag without parent'
  );

  t.deepEqual(
    to(h('select', h('option')), {omitOptionalTags: true}),
    '<select><option></select>',
    'should omit tag without following'
  );

  t.deepEqual(
    to(h('select', [h('option'), h('option')]), {omitOptionalTags: true}),
    '<select><option><option></select>',
    'should omit tag followed by `option`'
  );

  t.deepEqual(
    to(h('select', [h('option'), h('optgroup')]), {omitOptionalTags: true}),
    '<select><option><optgroup></select>',
    'should omit tag followed by `optgroup`'
  );

  t.deepEqual(
    to(h('select', [h('option'), h('p')]), {omitOptionalTags: true}),
    '<select><option></option><p></select>',
    'should not omit tag followed by others'
  );

  t.end();
});
