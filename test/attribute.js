import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('`element` attributes', async (t) => {
  await t.test('should support unknown properties', async function (t) {
    await t.test('should ignore unknowns set to `false`', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {unknown: false}}, [])),
        '<i></i>'
      )
    })

    await t.test('should ignore unknowns set to `null`', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {unknown: null}}, [])),
        '<i></i>'
      )
    })

    await t.test(
      'should ignore unknowns set to `undefined`',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {unknown: undefined}}, [])
          ),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore unknowns set to `NaN`', async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'i', properties: {unknown: Number.NaN}}, [])
        ),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize unknowns set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {unknown: true}}, [])),
          '<i unknown></i>'
        )
      }
    )

    await t.test(
      'should serialize unknowns set to their name as their name',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {unknown: 'unknown'}}, [])
          ),
          '<i unknown="unknown"></i>'
        )
      }
    )

    await t.test(
      'should serialize unknown lists as space-separated',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {unknown: ['a', 'b']}}, [])
          ),
          '<i unknown="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize unknowns set to an integer as it’s string version',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {unknown: 1}}, [])),
          '<i unknown="1"></i>'
        )
      }
    )

    await t.test('should serialize unknowns set to `0`', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {unknown: 0}}, [])),
        '<i unknown="0"></i>'
      )
    })

    await t.test('should serialize unknowns set to objects', async function () {
      assert.deepEqual(
        toHtml(
          // @ts-expect-error: check how the runtime handles a `toString` method on an object.
          u('element', {tagName: 'i', properties: {unknown: {toString}}}, [])
        ),
        '<i unknown="yup"></i>'
      )
    })
  })

  await t.test('shold support known booleans', async function (t) {
    await t.test(
      'should ignore known booleans set to `false`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {hidden: false}}, [])),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore falsey known booleans', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {hidden: 0}}, [])),
        '<i></i>'
      )
    })

    await t.test('should ignore NaN known booleans', async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'i', properties: {hidden: Number.NaN}}, [])
        ),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize known booleans set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {hidden: true}}, [])),
          '<i hidden></i>'
        )
      }
    )

    // TODO: why? "hidden" is  a valid value for the `hidden` attribute
    await t.test(
      'should serialize known booleans set to their name without value',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {hidden: 'hidden'}}, [])
          ),
          '<i hidden></i>'
        )
      }
    )

    await t.test(
      'should serialize truthy known booleans without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {hidden: 1}}, [])),
          '<i hidden></i>'
        )
      }
    )

    await t.test(
      'should serialize known booleans set to arbitrary strings with value',
      async function () {
        assert.deepEqual(
          toHtml(
            h('div', {
              selected: 'some string value for a well known boolean attribute'
            })
          ),
          '<div selected="some string value for a well known boolean attribute"></div>'
        )
      }
    )

    await t.test(
      'should serialize known booleans set to an empty string without value',
      async function () {
        assert.deepEqual(
          toHtml(
            h('div', {
              selected: ''
            })
          ),
          '<div selected></div>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to arbitrary strings with value',
      async function () {
        assert.deepEqual(
          toHtml(
            h('div', {
              download:
                'some string value for a well known overloaded boolean attribute'
            })
          ),
          '<div download="some string value for a well known overloaded boolean attribute"></div>'
        )
      }
    )
  })

  await t.test('should support known overloaded booleans', async function (t) {
    await t.test(
      'should ignore known overloaded booleans set to `false`',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'a', properties: {download: false}}, [])
          ),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should ignore falsey known overloaded booleans',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'a', properties: {download: 0}}, [])),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should ignore NaN known overloaded booleans',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'a', properties: {download: Number.NaN}}, [])
          ),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'a', properties: {download: true}}, [])
          ),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to their name without value',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'a', properties: {download: 'download'}}, [])
          ),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to an empty string without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'a', properties: {download: ''}}, [])),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize truthy known overloaded booleans without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'a', properties: {download: 1}}, [])),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to another string',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'a', properties: {download: 'another'}}, [])
          ),
          '<a download="another"></a>'
        )
      }
    )
  })
  await t.test('should support known numbers', async function (t) {
    await t.test(
      'should ignore known numbers set to `false`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: false}}, [])),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN known numbers', async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'a', properties: {cols: Number.NaN}}, [])
        ),
        '<a></a>'
      )
    })

    await t.test(
      'should serialize known numbers set to `0`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: 0}}, [])),
          '<i cols="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `-1`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: -1}}, [])),
          '<i cols="-1"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `1`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: 1}}, [])),
          '<i cols="1"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `Math.PI`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: Math.PI}}, [])),
          '<i cols="3.141592653589793"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: true}}, [])),
          '<i cols></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: ''}}, [])),
          '<i cols=""></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to their name',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: 'cols'}}, [])),
          '<i cols="cols"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to a string',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {cols: 'another'}}, [])
          ),
          '<i cols="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an object',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            u('element', {tagName: 'i', properties: {cols: {toString}}}, [])
          ),
          '<i cols="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of strings',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {cols: ['a', 'b']}}, [])
          ),
          '<i cols="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of numbers',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {cols: [0, 50]}}, [])),
          '<i cols="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of booleans',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles booleans in an array.
            u('element', {tagName: 'i', properties: {cols: [true, false]}}, [])
          ),
          '<i cols="true false"></i>'
        )
      }
    )
  })

  await t.test(
    'should support known space-separated lists',
    async function (t) {
      await t.test(
        'should ignore known space-separated lists set to `false`',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: false}}, [])
            ),
            '<i></i>'
          )
        }
      )

      await t.test(
        'should ignore NaN known space-separated lists',
        async function () {
          assert.deepEqual(
            toHtml(
              u(
                'element',
                {tagName: 'a', properties: {className: Number.NaN}},
                []
              )
            ),
            '<a></a>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to `0`',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: 0}}, [])
            ),
            '<i class="0"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to `true` as without value',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: true}}, [])
            ),
            '<i class></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an empty string',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: ''}}, [])
            ),
            '<i class=""></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to their attribute name',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: 'class'}}, [])
            ),
            '<i class="class"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to their property name',
        async function () {
          assert.deepEqual(
            toHtml(
              u(
                'element',
                {tagName: 'i', properties: {className: 'className'}},
                []
              )
            ),
            '<i class="className"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to a string',
        async function () {
          assert.deepEqual(
            toHtml(
              u(
                'element',
                {tagName: 'i', properties: {className: 'another'}},
                []
              )
            ),
            '<i class="another"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an object',
        async function () {
          assert.deepEqual(
            toHtml(
              // @ts-expect-error: check how the runtime handles a `toString` method on an object.
              u(
                'element',
                {tagName: 'i', properties: {className: {toString}}},
                []
              )
            ),
            '<i class="yup"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of strings',
        async function () {
          assert.deepEqual(
            toHtml(
              u(
                'element',
                {tagName: 'i', properties: {className: ['a', 'b']}},
                []
              )
            ),
            '<i class="a b"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of numbers',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {className: [0, 50]}}, [])
            ),
            '<i class="0 50"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of booleans',
        async function () {
          assert.deepEqual(
            toHtml(
              // @ts-expect-error: check how the runtime handles booleans in an array.
              u(
                'element',
                {tagName: 'i', properties: {className: [true, false]}},
                []
              )
            ),
            '<i class="true false"></i>'
          )
        }
      )
    }
  )

  await t.test(
    'should support known comma-separated lists',
    async function (t) {
      await t.test(
        'should ignore known comma-separated lists set to `false`',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: false}}, [])
            ),
            '<i></i>'
          )
        }
      )

      await t.test(
        'should ignore NaN known comma-separated lists',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'a', properties: {accept: Number.NaN}}, [])
            ),
            '<a></a>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to `0`',
        async function () {
          assert.deepEqual(
            toHtml(u('element', {tagName: 'i', properties: {accept: 0}}, [])),
            '<i accept="0"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to `true` as without value',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: true}}, [])
            ),
            '<i accept></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an empty string',
        async function () {
          assert.deepEqual(
            toHtml(u('element', {tagName: 'i', properties: {accept: ''}}, [])),
            '<i accept=""></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to their name',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: 'accept'}}, [])
            ),
            '<i accept="accept"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to a string',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: 'another'}}, [])
            ),
            '<i accept="another"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an object',
        async function () {
          assert.deepEqual(
            toHtml(
              // @ts-expect-error: check how the runtime handles a `toString` method on an object.
              u('element', {tagName: 'i', properties: {accept: {toString}}}, [])
            ),
            '<i accept="yup"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of strings',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, [])
            ),
            '<i accept="a, b"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of numbers',
        async function () {
          assert.deepEqual(
            toHtml(
              u('element', {tagName: 'i', properties: {accept: [0, 50]}}, [])
            ),
            '<i accept="0, 50"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of booleans',
        async function () {
          assert.deepEqual(
            toHtml(
              // @ts-expect-error: check how the runtime handles booleans in an array.
              u(
                'element',
                {tagName: 'i', properties: {accept: [true, false]}},
                []
              )
            ),
            '<i accept="true, false"></i>'
          )
        }
      )
    }
  )

  await t.test('should support known normals', async function (t) {
    await t.test(
      'should ignore known normals set to `false`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: false}}, [])),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN known normals', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {id: Number.NaN}}, [])),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize known normals set to `0`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: 0}}, [])),
          '<i id="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: true}}, [])),
          '<i id></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: ''}}, [])),
          '<i id=""></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to their name',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: 'id'}}, [])),
          '<i id="id"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to a string',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: 'another'}}, [])),
          '<i id="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an object',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            u('element', {tagName: 'i', properties: {id: {toString}}}, [])
          ),
          '<i id="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of strings as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {id: ['a', 'b']}}, [])
          ),
          '<i id="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of numbers as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: [0, 50]}}, [])),
          '<i id="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of booleans as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles booleans in an array.
            u('element', {tagName: 'i', properties: {id: [true, false]}}, [])
          ),
          '<i id="true false"></i>'
        )
      }
    )
  })

  await t.test('should support data properties', async function (t) {
    await t.test(
      'should ignore data properties set to `false`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {dataId: false}}, [])),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN data properties', async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'i', properties: {dataId: Number.NaN}}, [])
        ),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize data properties set to `0`',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {dataId: 0}}, [])),
          '<i data-id="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {dataId: true}}, [])),
          '<i data-id></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {dataId: ''}}, [])),
          '<i data-id=""></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to their property name',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {dataId: 'dataId'}}, [])
          ),
          '<i data-id="dataId"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to their attribute name',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {dataId: 'data-id'}}, [])
          ),
          '<i data-id="data-id"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to a string',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {dataId: 'another'}}, [])
          ),
          '<i data-id="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize numeric-first data properties set to a string',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {data123: 'a'}}, [])),
          '<i data-123="a"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an object',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            u('element', {tagName: 'i', properties: {dataId: {toString}}}, [])
          ),
          '<i data-id="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of strings as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {dataId: ['a', 'b']}}, [])
          ),
          '<i data-id="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of numbers as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {dataId: [0, 50]}}, [])
          ),
          '<i data-id="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of booleans as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml(
            // @ts-expect-error: check how the runtime handles booleans in an array.
            u(
              'element',
              {tagName: 'i', properties: {dataId: [true, false]}},
              []
            )
          ),
          '<i data-id="true false"></i>'
        )
      }
    )
  })

  await t.test('should support `collapseEmptyAttributes`', async function (t) {
    await t.test('should show empty string attributes', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {id: ''}}, [])),
        '<i id=""></i>'
      )
    })

    await t.test(
      'should collapse empty string attributes in `collapseEmptyAttributes` mode',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: ''}}, []), {
            collapseEmptyAttributes: true
          }),
          '<i id></i>'
        )
      }
    )
  })

  await t.test('should support `tightAttributes`', async function (t) {
    await t.test('should serialize multiple properties', async function () {
      assert.deepEqual(
        toHtml(
          u('element', {tagName: 'i', properties: {title: 'a', id: 'b'}}, [])
        ),
        '<i title="a" id="b"></i>'
      )
    })

    await t.test(
      'should serialize multiple properties tightly in `tightAttributes` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: 'a', id: 'b'}}, []),
            {
              tightAttributes: true
            }
          ),
          '<i title="a"id="b"></i>'
        )
      }
    )
  })

  await t.test('should support `tightCommaSeparatedLists`', async function (t) {
    await t.test(
      'should serialize comma-separated attributes',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, [])
          ),
          '<i accept="a, b"></i>'
        )
      }
    )

    await t.test(
      'should serialize comma-separated attributes tighly in `tightCommaSeparatedLists` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {accept: ['a', 'b']}}, []),
            {
              tightCommaSeparatedLists: true
            }
          ),
          '<i accept="a,b"></i>'
        )
      }
    )
  })

  await t.test('should support `quote`', async function (t) {
    await t.test(
      'should quote attribute values with double quotes by default',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, [])),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      "should quote attribute values with single quotes if `quote: '\\''`",
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
            quote: "'"
          }),
          "<i title='a'></i>"
        )
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\\\"'`",
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
            quote: '"'
          }),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      "should quote attribute values with single quotes if `quote: '\\''` even if they occur in value",
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: "'a'"}}, []), {
            quote: "'"
          }),
          "<i title='&#x27;a&#x27;'></i>"
        )
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\\\"'` even if they occur in value",
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: '"a"'}}, []), {
            quote: '"'
          }),
          '<i title="&#x22;a&#x22;"></i>'
        )
      }
    )

    await t.test('should throw on invalid quotes', async function () {
      assert.throws(function () {
        toHtml(
          h('img'),
          // @ts-expect-error: check how the runtime handles an incorrect `quote`
          {quote: '`'}
        )
      }, /Invalid quote ```, expected `'` or `"`/)
    })
  })

  await t.test('should support `quoteSmart`', async function (t) {
    await t.test(
      'should quote attribute values with primary quotes by default',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: 'a'}}, []), {
            allowDangerousCharacters: true,
            quoteSmart: true
          }),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if the alternative occurs',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: "'a'"}}, []), {
            allowDangerousCharacters: true,
            quoteSmart: true
          }),
          '<i title="\'a\'"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur less than the alternative',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: "'\"a'"}}, []),
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title="\'&#x22;a\'"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: '"a\''}}, []),
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title="&#x22;a\'"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: '"\'a\'"'}}, []),
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title="&#x22;\'a\'&#x22;"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with alternative quotes if the primary occurs',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: '"a"'}}, []), {
            allowDangerousCharacters: true,
            quoteSmart: true
          }),
          '<i title=\'"a"\'></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with alternative quotes if they occur less than the primary',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: '"\'a"'}}, []),
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title=\'"&#x27;a"\'></i>'
        )
      }
    )
  })

  await t.test('should support `preferUnquoted`', async function (t) {
    await t.test('should omit quotes in `preferUnquoted`', async function () {
      assert.deepEqual(
        toHtml(u('element', {tagName: 'i', properties: {id: 'a'}}, []), {
          preferUnquoted: true
        }),
        '<i id=a></i>'
      )
    })

    await t.test(
      'should keep quotes in `preferUnquoted` and impossible',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: 'a b'}}, []), {
            preferUnquoted: true
          }),
          '<i id="a b"></i>'
        )
      }
    )

    await t.test(
      'should not add `=` when omitting quotes on empty values',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {id: ''}}, []), {
            preferUnquoted: true
          }),
          '<i id></i>'
        )
      }
    )
  })

  await t.test('should support entities in attributes', async function (t) {
    await t.test(
      'should encode entities in attribute names',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {'3<5\0': 'a'}}, [])),
          '<i 3&#x3C;5&#x0;="a"></i>'
        )
      }
    )

    await t.test(
      'should encode entities in attribute values',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: '3<5\0'}}, [])
          ),
          '<i title="3<5&#x0;"></i>'
        )
      }
    )

    await t.test(
      'should not encode characters in attribute names which cause parse errors, but work, in `allowParseErrors` mode',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {'3=5\0': 'a'}}, []), {
            allowParseErrors: true
          }),
          '<i 3&#x3D;5\0="a"></i>'
        )
      }
    )

    await t.test(
      'should not encode characters in attribute values which cause parse errors, but work, in `allowParseErrors` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            u('element', {tagName: 'i', properties: {title: '3=5\0'}}, []),
            {
              allowParseErrors: true
            }
          ),
          '<i title="3=5\0"></i>'
        )
      }
    )

    await t.test(
      'should not encode characters which cause XSS issues in older browsers, in `allowDangerousCharacters` mode',
      async function () {
        assert.deepEqual(
          toHtml(u('element', {tagName: 'i', properties: {title: "3'5"}}, []), {
            allowDangerousCharacters: true
          }),
          '<i title="3\'5"></i>'
        )
      }
    )
  })
})

function toString() {
  return 'yup'
}
