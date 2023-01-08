import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`root`', () => {
  assert.deepEqual(
    toHtml(
      u('root', [u('text', 'alpha '), h('i', 'bravo'), u('text', ' charlie')])
    ),
    'alpha <i>bravo</i> charlie',
    'should serialize `root`s'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toHtml(u('root')),
    '',
    'should serialize `root`s w/o children'
  )
})
