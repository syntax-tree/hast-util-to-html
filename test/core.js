'use strict'

var test = require('tape')
var u = require('unist-builder')
var h = require('hastscript')
var to = require('..')

test('toHtml()', function (t) {
  t.throws(
    function () {
      to(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  t.throws(
    function () {
      to(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )

  t.equal(to(h()), '<div></div>', 'should support a node')
  t.equal(to([h('b'), h('i')]), '<b></b><i></i>', 'should support an array')

  t.end()
})
