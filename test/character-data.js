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
test('`characterData`', function (t) {
  t.deepEqual(
    to(u('characterData', 'alpha')),
    '<![CDATA[alpha]]>',
    'should stringify `characterData`s'
  );

  t.deepEqual(
    to(u('characterData', 'AT&T')),
    '<![CDATA[AT&T]]>',
    'should not encode `characterData`s (#1)'
  );

  /* No way to get around this. */
  t.deepEqual(
    to(u('characterData', ']]>')),
    '<![CDATA[]]>]]>',
    'should not encode `characterData`s (#2)'
  );

  t.end();
});
