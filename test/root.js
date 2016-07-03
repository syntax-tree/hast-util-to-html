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
test('`root`', function (t) {
  t.deepEqual(
    to(u('root', [
      u('text', 'alpha '),
      h('i', 'bravo'),
      u('text', ' charlie')
    ])),
    'alpha <i>bravo</i> charlie',
    'should stringify `root`s'
  );

  t.end();
});
