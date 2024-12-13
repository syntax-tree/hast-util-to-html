import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`root`', async function (t) {
  await t.test('should serialize `root`s', async function () {
    assert.deepEqual(
      toHtml({
        type: 'root',
        children: [
          {type: 'text', value: 'alpha '},
          h('i', 'bravo'),
          {type: 'text', value: ' charlie'}
        ]
      }),
      'alpha <i>bravo</i> charlie'
    )
  })

  await t.test('should serialize `root`s w/o children', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles missing `children`.
      toHtml({type: 'root'}),
      ''
    )
  })
})
