/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-to-html
 * @fileoverview Test suite for `hast-util-to-html`.
 */

'use strict';

/* eslint-env node */

/* Subtests. */
require('./core');
require('./root');
require('./comment');
require('./doctype');
require('./text');
require('./raw');
require('./element');
require('./attribute');
require('./omission');
require('./omission-opening');
require('./omission-closing');

/* Legacy. */
require('./character-data');
require('./directive');
