import test from 'tape'
import {h} from 'hastscript'
import {toHtml} from '../index.js'

test('`omitOptionalTags` mode', function (t) {
  t.deepEqual(
    toHtml(h('html'), {omitOptionalTags: true}),
    '',
    'should omit opening and closing tags'
  )

  t.deepEqual(
    toHtml(h('html', {lang: 'en'}), {omitOptionalTags: true}),
    '<html lang="en">',
    'should not omit opening tags with attributes'
  )

  t.deepEqual(
    toHtml(h('ol', [h('li', 'alpha'), h('li', 'bravo')]), {
      omitOptionalTags: true
    }),
    '<ol><li>alpha<li>bravo</ol>',
    'should ignore whitespace when determining whether tags can be omitted (#1)'
  )

  t.deepEqual(
    toHtml(h('ol', [h('li', 'alpha'), ' ', h('li', 'bravo'), '\t']), {
      omitOptionalTags: true
    }),
    '<ol><li>alpha <li>bravo\t</ol>',
    'should ignore whitespace when determining whether tags can be omitted (#2)'
  )

  t.end()
})
