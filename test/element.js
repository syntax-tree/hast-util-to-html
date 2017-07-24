'use strict';

var test = require('tape');
var h = require('hastscript');
var to = require('..');

test('`element`', function (t) {
  t.deepEqual(
    to(h('i', 'bravo')),
    '<i>bravo</i>',
    'should stringify `element`s'
  );

  t.deepEqual(
    to(h('foo')),
    '<foo></foo>',
    'should stringify unknown `element`s'
  );

  t.deepEqual(
    to(h('img')),
    '<img>',
    'should stringify void `element`s'
  );

  t.deepEqual(
    to(h('foo'), {voids: ['foo']}),
    '<foo>',
    'should stringify given void `element`s'
  );

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true}),
    '<img />',
    'should stringify with ` /` in `closeSelfClosing` mode'
  );

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true, tightSelfClosing: true}),
    '<img/>',
    'should stringify voids with `/` in `closeSelfClosing` ' +
    'and `tightSelfClosing` mode'
  );

  t.deepEqual(
    to(h('img', {title: '/'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    '<img title=/ />',
    'should stringify voids with a ` /` in if an unquoted ' +
    'attribute ends with `/`'
  );

  t.end();
});
