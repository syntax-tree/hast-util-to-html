import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`root`', function (t) {
  t.deepEqual(
    toHtml(
      u('root', [u('text', 'alpha '), h('i', 'bravo'), u('text', ' charlie')])
    ),
    'alpha <i>bravo</i> charlie',
    'should serialize `root`s'
  )

  // @ts-ignore runtime.
  t.deepEqual(toHtml(u('root')), '', 'should serialize `root`s w/o children')

  t.end()
})
