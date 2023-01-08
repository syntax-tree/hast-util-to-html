import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`element` attributes', async (t) => {
  await t.test('unknown', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {unknown: false}}, [])),
      '<i></i>',
      'should ignore unknowns set to `false`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {unknown: null}}, [])),
      '<i></i>',
      'should ignore unknowns set to `null`'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {unknown: undefined}}, [])
      ),
      '<i></i>',
      'should ignore unknowns set to `undefined`'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {unknown: Number.NaN}}, [])
      ),
      '<i></i>',
      'should ignore unknowns set to `NaN`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {unknown: true}}, [])),
      '<i unknown></i>',
      'should serialize unknowns set to `true` without value'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {unknown: 'unknown'}}, [])
      ),
      '<i unknown="unknown"></i>',
      'should serialize unknowns set to their name as their name'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {unknown: ['a', 'b']}}, [])
      ),
      '<i unknown="a b"></i>',
      'should serialize unknown lists as space-separated'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {unknown: 1}}, [])),
      '<i unknown="1"></i>',
      'should serialize unknowns set to an integer as it’s string version'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {unknown: 0}}, [])),
      '<i unknown="0"></i>',
      'should serialize unknowns set to `0`'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {unknown: {toString}}}, [])
      ),
      '<i unknown="yup"></i>',
      'should serialize unknowns set to objects'
    )
  })

  await t.test('known booleans', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {hidden: false}}, [])),
      '<i></i>',
      'should ignore known booleans set to `false`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {hidden: 0}}, [])),
      '<i></i>',
      'should ignore falsey known booleans'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {hidden: Number.NaN}}, [])
      ),
      '<i></i>',
      'should ignore NaN known booleans'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {hidden: true}}, [])),
      '<i hidden></i>',
      'should serialize known booleans set to `true` without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {hidden: 'hidden'}}, [])),
      '<i hidden></i>',
      'should serialize known booleans set to their name without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {hidden: 1}}, [])),
      '<i hidden></i>',
      'should serialize truthy known booleans without value'
    )
  })

  await t.test('known overloaded booleans', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {download: false}}, [])),
      '<a></a>',
      'should ignore known overloaded booleans set to `false`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {download: 0}}, [])),
      '<a></a>',
      'should ignore falsey known overloaded booleans'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'a', properties: {download: Number.NaN}}, [])
      ),
      '<a></a>',
      'should ignore NaN known overloaded booleans'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {download: true}}, [])),
      '<a download></a>',
      'should serialize known overloaded booleans set to `true` without value'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'a', properties: {download: 'download'}}, [])
      ),
      '<a download></a>',
      'should serialize known overloaded booleans set to their name without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {download: ''}}, [])),
      '<a download></a>',
      'should serialize known overloaded booleans set to an empty string without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {download: 1}}, [])),
      '<a download></a>',
      'should serialize truthy known overloaded booleans without value'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'a', properties: {download: 'another'}}, [])
      ),
      '<a download="another"></a>',
      'should serialize known overloaded booleans set to another string'
    )
  })

  await t.test('known numbers', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: false}}, [])),
      '<i></i>',
      'should ignore known numbers set to `false`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'a', properties: {cols: Number.NaN}}, [])),
      '<a></a>',
      'should ignore NaN known numbers'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: 0}}, [])),
      '<i cols="0"></i>',
      'should serialize known numbers set to `0`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: -1}}, [])),
      '<i cols="-1"></i>',
      'should serialize known numbers set to `-1`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: 1}}, [])),
      '<i cols="1"></i>',
      'should serialize known numbers set to `1`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: Math.PI}}, [])),
      '<i cols="3.141592653589793"></i>',
      'should serialize known numbers set to `Math.PI`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: true}}, [])),
      '<i cols></i>',
      'should serialize known numbers set to `true` as without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: ''}}, [])),
      '<i cols=""></i>',
      'should serialize known numbers set to an empty string'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: 'cols'}}, [])),
      '<i cols="cols"></i>',
      'should serialize known numbers set to their name'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: 'another'}}, [])),
      '<i cols="another"></i>',
      'should serialize known numbers set to a string'
    )

    assert.deepEqual(
      // @ts-expect-error runtime.
      toHtml(u('element', {tagName: 'i', properties: {cols: {toString}}}, [])),
      '<i cols="yup"></i>',
      'should serialize known numbers set to an object'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: ['a', 'b']}}, [])),
      '<i cols="a b"></i>',
      'should serialize known numbers set to an array of strings'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {cols: [0, 50]}}, [])),
      '<i cols="0 50"></i>',
      'should serialize known numbers set to an array of numbers'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {cols: [true, false]}}, [])
      ),
      '<i cols="true false"></i>',
      'should serialize known numbers set to an array of booleans'
    )
  })

  await t.test('known space-separated lists', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {className: false}}, [])),
      '<i></i>',
      'should ignore known space-separated lists set to `false`'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'a', properties: {className: Number.NaN}}, [])
      ),
      '<a></a>',
      'should ignore NaN known space-separated lists'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {className: 0}}, [])),
      '<i class="0"></i>',
      'should serialize known space-separated lists set to `0`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {className: true}}, [])),
      '<i class></i>',
      'should serialize known space-separated lists set to `true` as without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {className: ''}}, [])),
      '<i class=""></i>',
      'should serialize known space-separated lists set to an empty string'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {className: 'class'}}, [])
      ),
      '<i class="class"></i>',
      'should serialize known space-separated lists set to their attribute name'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {className: 'className'}}, [])
      ),
      '<i class="className"></i>',
      'should serialize known space-separated lists set to their property name'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {className: 'another'}}, [])
      ),
      '<i class="another"></i>',
      'should serialize known space-separated lists set to a string'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {className: {toString}}}, [])
      ),
      '<i class="yup"></i>',
      'should serialize known space-separated lists set to an object'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {className: ['a', 'b']}}, [])
      ),
      '<i class="a b"></i>',
      'should serialize known space-separated lists set to an array of strings'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {className: [0, 50]}}, [])
      ),
      '<i class="0 50"></i>',
      'should serialize known space-separated lists set to an array of numbers'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {className: [true, false]}}, [])
      ),
      '<i class="true false"></i>',
      'should serialize known space-separated lists set to an array of booleans'
    )
  })

  await t.test('known comma-separated lists', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: false}}, [])),
      '<i></i>',
      'should ignore known comma-separated lists set to `false`'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'a', properties: {accept: Number.NaN}}, [])
      ),
      '<a></a>',
      'should ignore NaN known comma-separated lists'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: 0}}, [])),
      '<i accept="0"></i>',
      'should serialize known comma-separated lists set to `0`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: true}}, [])),
      '<i accept></i>',
      'should serialize known comma-separated lists set to `true` as without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: ''}}, [])),
      '<i accept=""></i>',
      'should serialize known comma-separated lists set to an empty string'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: 'accept'}}, [])),
      '<i accept="accept"></i>',
      'should serialize known comma-separated lists set to their name'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: 'another'}}, [])),
      '<i accept="another"></i>',
      'should serialize known comma-separated lists set to a string'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {accept: {toString}}}, [])
      ),
      '<i accept="yup"></i>',
      'should serialize known comma-separated lists set to an object'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, [])
      ),
      '<i accept="a, b"></i>',
      'should serialize known comma-separated lists set to an array of strings'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {accept: [0, 50]}}, [])),
      '<i accept="0, 50"></i>',
      'should serialize known comma-separated lists set to an array of numbers'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {accept: [true, false]}}, [])
      ),
      '<i accept="true, false"></i>',
      'should serialize known comma-separated lists set to an array of booleans'
    )
  })

  await t.test('known normals', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: false}}, [])),
      '<i></i>',
      'should ignore known normals set to `false`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: Number.NaN}}, [])),
      '<i></i>',
      'should ignore NaN known normals'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: 0}}, [])),
      '<i id="0"></i>',
      'should serialize known normals set to `0`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: true}}, [])),
      '<i id></i>',
      'should serialize known normals set to `true` as without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: ''}}, [])),
      '<i id=""></i>',
      'should serialize known normals set to an empty string'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: 'id'}}, [])),
      '<i id="id"></i>',
      'should serialize known normals set to their name'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: 'another'}}, [])),
      '<i id="another"></i>',
      'should serialize known normals set to a string'
    )

    assert.deepEqual(
      // @ts-expect-error runtime.
      toHtml(u('element', {tagName: 'i', properties: {id: {toString}}}, [])),
      '<i id="yup"></i>',
      'should serialize known normals set to an object'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: ['a', 'b']}}, [])),
      '<i id="a b"></i>',
      'should serialize known normals set to an array of strings as a space-separated list'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: [0, 50]}}, [])),
      '<i id="0 50"></i>',
      'should serialize known normals set to an array of numbers as a space-separated list'
    )

    assert.deepEqual(
      // @ts-expect-error runtime.
      toHtml(u('element', {tagName: 'i', properties: {id: [true, false]}}, [])),
      '<i id="true false"></i>',
      'should serialize known normals set to an array of booleans as a space-separated list'
    )
  })

  await t.test('data properties', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: false}}, [])),
      '<i></i>',
      'should ignore data properties set to `false`'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {dataId: Number.NaN}}, [])
      ),
      '<i></i>',
      'should ignore NaN data properties'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: 0}}, [])),
      '<i data-id="0"></i>',
      'should serialize data properties set to `0`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: true}}, [])),
      '<i data-id></i>',
      'should serialize data properties set to `true` as without value'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: ''}}, [])),
      '<i data-id=""></i>',
      'should serialize data properties set to an empty string'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: 'dataId'}}, [])),
      '<i data-id="dataId"></i>',
      'should serialize data properties set to their property name'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: 'data-id'}}, [])),
      '<i data-id="data-id"></i>',
      'should serialize data properties set to their attribute name'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: 'another'}}, [])),
      '<i data-id="another"></i>',
      'should serialize data properties set to a string'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {data123: 'a'}}, [])),
      '<i data-123="a"></i>',
      'should serialize numeric-first data properties set to a string'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {dataId: {toString}}}, [])
      ),
      '<i data-id="yup"></i>',
      'should serialize data properties set to an object'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {dataId: ['a', 'b']}}, [])
      ),
      '<i data-id="a b"></i>',
      'should serialize data properties set to an array of strings as a space-separated list'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {dataId: [0, 50]}}, [])),
      '<i data-id="0 50"></i>',
      'should serialize data properties set to an array of numbers as a space-separated list'
    )

    assert.deepEqual(
      toHtml(
        // @ts-expect-error runtime.
        u('element', {tagName: 'i', properties: {dataId: [true, false]}}, [])
      ),
      '<i data-id="true false"></i>',
      'should serialize data properties set to an array of booleans as a space-separated list'
    )
  })

  await t.test('collapseEmptyAttributes', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: ''}}, [])),
      '<i id=""></i>',
      'should show empty string attributes'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: ''}}, []), {
        collapseEmptyAttributes: true
      }),
      '<i id></i>',
      'should collapse empty string attributes in `collapseEmptyAttributes` mode'
    )
  })

  await t.test('tightAttributes', () => {
    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {title: 'a', id: 'b'}}, [])
      ),
      '<i title="a" id="b"></i>',
      'should serialize multiple properties'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {title: 'a', id: 'b'}}, []),
        {
          tightAttributes: true
        }
      ),
      '<i title="a"id="b"></i>',
      'should serialize multiple properties tightly in `tightAttributes` mode'
    )
  })

  await t.test('tightCommaSeparatedLists', () => {
    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, [])
      ),
      '<i accept="a, b"></i>',
      'should serialize comma-separated attributes'
    )

    assert.deepEqual(
      toHtml(
        u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, []),
        {
          tightCommaSeparatedLists: true
        }
      ),
      '<i accept="a,b"></i>',
      'should serialize comma-separated attributes tighly in `tightCommaSeparatedLists` mode'
    )
  })

  await t.test('quote', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, [])),
      '<i title="a"></i>',
      'should quote attribute values with double quotes by default'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
        quote: "'"
      }),
      "<i title='a'></i>",
      "should quote attribute values with single quotes if `quote: '\\''`"
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
        quote: '"'
      }),
      '<i title="a"></i>',
      "should quote attribute values with double quotes if `quote: '\\\"'`"
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: "'a'"}}, []), {
        quote: "'"
      }),
      "<i title='&#x27;a&#x27;'></i>",
      "should quote attribute values with single quotes if `quote: '\\''` even if they occur in value"
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '"a"'}}, []), {
        quote: '"'
      }),
      '<i title="&#x22;a&#x22;"></i>',
      "should quote attribute values with double quotes if `quote: '\\\"'` even if they occur in value"
    )

    assert.throws(
      () => {
        // @ts-expect-error runtime.
        toHtml(h('img'), {quote: '`'})
      },
      /Invalid quote ```, expected `'` or `"`/,
      'should throw on invalid quotes'
    )
  })

  await t.test('quoteSmart', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title="a"></i>',
      'should quote attribute values with primary quotes by default'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: "'a'"}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title="\'a\'"></i>',
      'should quote attribute values with primary quotes if the alternative occurs'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: "'\"a'"}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title="\'&#x22;a\'"></i>',
      'should quote attribute values with primary quotes if they occur less than the alternative'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '"a\''}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title="&#x22;a\'"></i>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '"\'a\'"'}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title="&#x22;\'a\'&#x22;"></i>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '"a"'}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title=\'"a"\'></i>',
      'should quote attribute values with alternative quotes if the primary occurs'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '"\'a"'}}, []), {
        allowDangerousCharacters: true,
        quoteSmart: true
      }),
      '<i title=\'"&#x27;a"\'></i>',
      'should quote attribute values with alternative quotes if they occur less than the primary'
    )
  })

  await t.test('preferUnquoted', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: 'a'}}, []), {
        preferUnquoted: true
      }),
      '<i id=a></i>',
      'should omit quotes in `preferUnquoted`'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: 'a b'}}, []), {
        preferUnquoted: true
      }),
      '<i id="a b"></i>',
      'should keep quotes in `preferUnquoted` and impossible'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {id: ''}}, []), {
        preferUnquoted: true
      }),
      '<i id></i>',
      'should not add `=` when omitting quotes on empty values'
    )
  })

  await t.test('entities in attributes', () => {
    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {'3<5\0': 'a'}}, [])),
      '<i 3&#x3C;5&#x0;="a"></i>',
      'should encode entities in attribute names'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '3<5\0'}}, [])),
      '<i title="3<5&#x0;"></i>',
      'should encode entities in attribute values'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {'3=5\0': 'a'}}, []), {
        allowParseErrors: true
      }),
      '<i 3&#x3D;5\0="a"></i>',
      'should not encode characters in attribute names which cause parse errors, but work, in `allowParseErrors` mode'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: '3=5\0'}}, []), {
        allowParseErrors: true
      }),
      '<i title="3=5\0"></i>',
      'should not encode characters in attribute values which cause parse errors, but work, in `allowParseErrors` mode'
    )

    assert.deepEqual(
      toHtml(u('element', {tagName: 'i', properties: {title: "3'5"}}, []), {
        allowDangerousCharacters: true
      }),
      '<i title="3\'5"></i>',
      'should not encode characters which cause XSS issues in older browsers, in `allowDangerousCharacters` mode'
    )
  })
})

function toString() {
  return 'yup'
}
