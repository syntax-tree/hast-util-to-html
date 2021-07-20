import test from 'tape'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('toHtml()', (t) => {
  t.throws(
    () => {
      // @ts-ignore runtime.
      toHtml(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  t.throws(
    () => {
      // @ts-ignore runtime.
      toHtml(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )

  t.equal(toHtml(h('')), '<div></div>', 'should support a node')
  t.equal(toHtml([h('b'), h('i')]), '<b></b><i></i>', 'should support an array')

  t.end()
})
