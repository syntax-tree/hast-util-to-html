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
test('`text`', function (t) {
  t.deepEqual(
    to(u('directive', {name: '!alpha'}, '!alpha bravo')),
    '<!alpha bravo>',
    'should stringify declaration `directive`s'
  );

  t.deepEqual(
    to(u('directive', {name: '!at&t'}, '!at&t bravo')),
    '<!at&t bravo>',
    'should not encode declaration `directive`s (#1)'
  );

  /* No way to get around this. */
  t.deepEqual(
    to(u('directive', {name: '!>'}, '!>')),
    '<!>>',
    'should not encode declaration `directive`s (#2)'
  );

  t.deepEqual(
    to(u('directive', {name: '?xml'}, '?xml version="1.0"')),
    '<?xml version="1.0">',
    'should stringify processing instruction `directive`s'
  );

  t.deepEqual(
    to(u('directive', {name: '?xml'}, '?xml version="at&t"')),
    '<?xml version="at&t">',
    'should not encode processing instruction `directive`s (#1)'
  );

  /* No way to get around this. */
  t.deepEqual(
    to(u('directive', {name: '?xml'}, '?xml>')),
    '<?xml>>',
    'should not encode processing instruction `directive`s (#2)'
  );

  t.end();
});
