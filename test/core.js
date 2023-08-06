import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('toHtml()', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('hast-util-to-html')).sort(), [
      'toHtml'
    ])
  })

  await t.test('should throw on non-nodes', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles a non-node.
      toHtml(true)
    }, /Expected node, not `true`/)
  })

  await t.test('should throw on unknown nodes', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles an unknown node.
      toHtml(u('foo', []))
    }, /Cannot compile unknown node `foo`/)
  })

  await t.test('should support a node', async function () {
    assert.equal(toHtml(h('')), '<div></div>')
  })

  await t.test('should support an array', async function () {
    assert.equal(toHtml([h('b'), h('i')]), '<b></b><i></i>')
  })
})
