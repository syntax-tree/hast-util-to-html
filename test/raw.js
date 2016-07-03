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
var u = require('unist-builder');
var to = require('..');

/* Tests. */
test('`element`', function (t) {
  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  );

  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>'), {allowDangerousHTML: true}),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousHTML` mode'
  );

  t.end();
});
