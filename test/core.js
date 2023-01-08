import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('toHtml()', () => {
  assert.throws(
    () => {
      // @ts-expect-error runtime.
      toHtml(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      toHtml(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )

  assert.equal(toHtml(h('')), '<div></div>', 'should support a node')
  assert.equal(
    toHtml([h('b'), h('i')]),
    '<b></b><i></i>',
    'should support an array'
  )
})
