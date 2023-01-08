import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`omitOptionalTags` mode', () => {
  assert.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit opening and closing tags'
  )

  assert.deepEqual(
    toHtml(h('html', {lang: 'en'}), {omitOptionalTags: true}),
    '<html lang="en">',
    'should not omit opening tags with attributes'
  )

  assert.deepEqual(
    toHtml(h('ol', [h('li', 'alpha'), h('li', 'bravo')]), {
      omitOptionalTags: true
    }),
    '<ol><li>alpha<li>bravo</ol>',
    'should ignore whitespace when determining whether tags can be omitted (#1)'
  )

  assert.deepEqual(
    toHtml(h('ol', [h('li', 'alpha'), ' ', h('li', 'bravo'), '\t']), {
      omitOptionalTags: true
    }),
    '<ol><li>alpha <li>bravo\t</ol>',
    'should ignore whitespace when determining whether tags can be omitted (#2)'
  )
})
