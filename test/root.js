import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('`root`', async function (t) {
  await t.test('should serialize `root`s', async function () {
    assert.deepEqual(
      toHtml(
        u('root', [u('text', 'alpha '), h('i', 'bravo'), u('text', ' charlie')])
      ),
      'alpha <i>bravo</i> charlie'
    )
  })

  await t.test('should serialize `root`s w/o children', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles missing `children`.
      toHtml(u('root')),
      ''
    )
  })
})
