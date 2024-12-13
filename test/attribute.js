import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {toHtml} from 'hast-util-to-html'

test('`element` attributes', async (t) => {
  await t.test('should support unknown properties', async function (t) {
    await t.test('should ignore unknowns set to `false`', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {unknown: false},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test('should ignore unknowns set to `null`', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {unknown: null},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test(
      'should ignore unknowns set to `undefined`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {unknown: undefined},
            children: []
          }),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore unknowns set to `NaN`', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {unknown: Number.NaN},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize unknowns set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {unknown: true},
            children: []
          }),
          '<i unknown></i>'
        )
      }
    )

    await t.test(
      'should serialize unknowns set to their name as their name',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {unknown: 'unknown'},
            children: []
          }),
          '<i unknown="unknown"></i>'
        )
      }
    )

    await t.test(
      'should serialize unknown lists as space-separated',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {unknown: ['a', 'b']},
            children: []
          }),
          '<i unknown="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize unknowns set to an integer as it’s string version',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {unknown: 1},
            children: []
          }),
          '<i unknown="1"></i>'
        )
      }
    )

    await t.test('should serialize unknowns set to `0`', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {unknown: 0},
          children: []
        }),
        '<i unknown="0"></i>'
      )
    })

    await t.test('should serialize unknowns set to objects', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          // @ts-expect-error: check how the runtime handles a `toString` method on an object.
          properties: {unknown: {toString}},
          children: []
        }),
        '<i unknown="yup"></i>'
      )
    })
  })

  await t.test('shold support known booleans', async function (t) {
    await t.test(
      'should ignore known booleans set to `false`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {hidden: false},
            children: []
          }),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore falsey known booleans', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {hidden: 0},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test('should ignore NaN known booleans', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {hidden: Number.NaN},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize known booleans set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {hidden: true},
            children: []
          }),
          '<i hidden></i>'
        )
      }
    )

    await t.test(
      'should serialize known booleans set to their name without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {hidden: 'hidden'},
            children: []
          }),
          '<i hidden></i>'
        )
      }
    )

    await t.test(
      'should serialize truthy known booleans without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {hidden: 1},
            children: []
          }),
          '<i hidden></i>'
        )
      }
    )

    await t.test(
      'should serialize known booleans set to arbitrary strings with value',
      async function () {
        assert.deepEqual(
          toHtml(h('div', {selected: 'something'})),
          '<div selected="something"></div>'
        )
      }
    )

    await t.test(
      'should serialize known booleans set to an empty string without value',
      async function () {
        assert.deepEqual(
          toHtml(h('div', {selected: ''})),
          '<div selected></div>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to arbitrary strings with value',
      async function () {
        assert.deepEqual(
          toHtml(h('div', {download: 'something'})),
          '<div download="something"></div>'
        )
      }
    )
  })

  await t.test('should support known overloaded booleans', async function (t) {
    await t.test(
      'should ignore known overloaded booleans set to `false`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: false},
            children: []
          }),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should ignore falsey known overloaded booleans',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: 0},
            children: []
          }),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should ignore NaN known overloaded booleans',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: Number.NaN},
            children: []
          }),
          '<a></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to `true` without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: true},
            children: []
          }),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to their name without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: 'download'},
            children: []
          }),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to an empty string without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: ''},
            children: []
          }),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize truthy known overloaded booleans without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: 1},
            children: []
          }),
          '<a download></a>'
        )
      }
    )

    await t.test(
      'should serialize known overloaded booleans set to another string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'a',
            properties: {download: 'another'},
            children: []
          }),
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: false},
            children: []
          }),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN known numbers', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'a',
          properties: {cols: Number.NaN},
          children: []
        }),
        '<a></a>'
      )
    })

    await t.test(
      'should serialize known numbers set to `0`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: 0},
            children: []
          }),
          '<i cols="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `-1`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: -1},
            children: []
          }),
          '<i cols="-1"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `1`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: 1},
            children: []
          }),
          '<i cols="1"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `Math.PI`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: Math.PI},
            children: []
          }),
          '<i cols="3.141592653589793"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: true},
            children: []
          }),
          '<i cols></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: ''},
            children: []
          }),
          '<i cols=""></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to their name',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: 'cols'},
            children: []
          }),
          '<i cols="cols"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to a string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: 'another'},
            children: []
          }),
          '<i cols="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an object',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            properties: {cols: {toString}},
            children: []
          }),
          '<i cols="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of strings',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: ['a', 'b']},
            children: []
          }),
          '<i cols="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of numbers',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {cols: [0, 50]},
            children: []
          }),
          '<i cols="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize known numbers set to an array of booleans',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles booleans in an array.
            properties: {cols: [true, false]},
            children: []
          }),
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
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: false},
              children: []
            }),
            '<i></i>'
          )
        }
      )

      await t.test(
        'should ignore NaN known space-separated lists',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'a',
              properties: {className: Number.NaN},
              children: []
            }),
            '<a></a>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to `0`',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: 0},
              children: []
            }),
            '<i class="0"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to `true` as without value',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: true},
              children: []
            }),
            '<i class></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an empty string',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: ''},
              children: []
            }),
            '<i class=""></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to their attribute name',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: 'class'},
              children: []
            }),
            '<i class="class"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to their property name',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: 'className'},
              children: []
            }),
            '<i class="className"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to a string',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: 'another'},
              children: []
            }),
            '<i class="another"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an object',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              // @ts-expect-error: check how the runtime handles a `toString` method on an object.
              properties: {className: {toString}},
              children: []
            }),
            '<i class="yup"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of strings',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: ['a', 'b']},
              children: []
            }),
            '<i class="a b"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of numbers',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {className: [0, 50]},
              children: []
            }),
            '<i class="0 50"></i>'
          )
        }
      )

      await t.test(
        'should serialize known space-separated lists set to an array of booleans',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              // @ts-expect-error: check how the runtime handles booleans in an array.
              properties: {className: [true, false]},
              children: []
            }),
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
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: false},
              children: []
            }),
            '<i></i>'
          )
        }
      )

      await t.test(
        'should ignore NaN known comma-separated lists',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'a',
              properties: {accept: Number.NaN},
              children: []
            }),
            '<a></a>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to `0`',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: 0},
              children: []
            }),
            '<i accept="0"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to `true` as without value',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: true},
              children: []
            }),
            '<i accept></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an empty string',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: ''},
              children: []
            }),
            '<i accept=""></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to their name',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: 'accept'},
              children: []
            }),
            '<i accept="accept"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to a string',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: 'another'},
              children: []
            }),
            '<i accept="another"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an object',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              // @ts-expect-error: check how the runtime handles a `toString` method on an object.
              properties: {accept: {toString}},
              children: []
            }),
            '<i accept="yup"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of strings',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: ['a', 'b']},
              children: []
            }),
            '<i accept="a, b"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of numbers',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              properties: {accept: [0, 50]},
              children: []
            }),
            '<i accept="0, 50"></i>'
          )
        }
      )

      await t.test(
        'should serialize known comma-separated lists set to an array of booleans',
        async function () {
          assert.deepEqual(
            toHtml({
              type: 'element',
              tagName: 'i',
              // @ts-expect-error: check how the runtime handles booleans in an array.
              properties: {accept: [true, false]},
              children: []
            }),
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: false},
            children: []
          }),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN known normals', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {id: Number.NaN},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize known normals set to `0`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: 0},
            children: []
          }),
          '<i id="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: true},
            children: []
          }),
          '<i id></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: ''},
            children: []
          }),
          '<i id=""></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to their name',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: 'id'},
            children: []
          }),
          '<i id="id"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to a string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: 'another'},
            children: []
          }),
          '<i id="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an object',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            properties: {id: {toString}},
            children: []
          }),
          '<i id="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of strings as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: ['a', 'b']},
            children: []
          }),
          '<i id="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of numbers as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {id: [0, 50]},
            children: []
          }),
          '<i id="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize known normals set to an array of booleans as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles booleans in an array.
            properties: {id: [true, false]},
            children: []
          }),
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: false},
            children: []
          }),
          '<i></i>'
        )
      }
    )

    await t.test('should ignore NaN data properties', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {dataId: Number.NaN},
          children: []
        }),
        '<i></i>'
      )
    })

    await t.test(
      'should serialize data properties set to `0`',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: 0},
            children: []
          }),
          '<i data-id="0"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to `true` as without value',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: true},
            children: []
          }),
          '<i data-id></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an empty string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: ''},
            children: []
          }),
          '<i data-id=""></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to their property name',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: 'dataId'},
            children: []
          }),
          '<i data-id="dataId"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to their attribute name',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: 'data-id'},
            children: []
          }),
          '<i data-id="data-id"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to a string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: 'another'},
            children: []
          }),
          '<i data-id="another"></i>'
        )
      }
    )

    await t.test(
      'should serialize numeric-first data properties set to a string',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {data123: 'a'},
            children: []
          }),
          '<i data-123="a"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an object',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles a `toString` method on an object.
            properties: {dataId: {toString}},
            children: []
          }),
          '<i data-id="yup"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of strings as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: ['a', 'b']},
            children: []
          }),
          '<i data-id="a b"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of numbers as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {dataId: [0, 50]},
            children: []
          }),
          '<i data-id="0 50"></i>'
        )
      }
    )

    await t.test(
      'should serialize data properties set to an array of booleans as a space-separated list',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            // @ts-expect-error: check how the runtime handles booleans in an array.
            properties: {dataId: [true, false]},
            children: []
          }),
          '<i data-id="true false"></i>'
        )
      }
    )
  })

  await t.test('should support `collapseEmptyAttributes`', async function (t) {
    await t.test('should show empty string attributes', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {id: ''},
          children: []
        }),
        '<i id=""></i>'
      )
    })

    await t.test(
      'should collapse empty string attributes in `collapseEmptyAttributes` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            {type: 'element', tagName: 'i', properties: {id: ''}, children: []},
            {
              collapseEmptyAttributes: true
            }
          ),
          '<i id></i>'
        )
      }
    )
  })

  await t.test('should support `tightAttributes`', async function (t) {
    await t.test('should serialize multiple properties', async function () {
      assert.deepEqual(
        toHtml({
          type: 'element',
          tagName: 'i',
          properties: {title: 'a', id: 'b'},
          children: []
        }),
        '<i title="a" id="b"></i>'
      )
    })

    await t.test(
      'should serialize multiple properties tightly in `tightAttributes` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: 'a', id: 'b'},
              children: []
            },
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {accept: ['a', 'b']},
            children: []
          }),
          '<i accept="a, b"></i>'
        )
      }
    )

    await t.test(
      'should serialize comma-separated attributes tighly in `tightCommaSeparatedLists` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {accept: ['a', 'b']},
              children: []
            },
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {title: 'a'},
            children: []
          }),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      "should quote attribute values with single quotes if `quote: '\\''`",
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: 'a'},
              children: []
            },
            {
              quote: "'"
            }
          ),
          "<i title='a'></i>"
        )
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\\\"'`",
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: 'a'},
              children: []
            },
            {
              quote: '"'
            }
          ),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      "should quote attribute values with single quotes if `quote: '\\''` even if they occur in value",
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: "'a'"},
              children: []
            },
            {
              quote: "'"
            }
          ),
          "<i title='&#x27;a&#x27;'></i>"
        )
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\\\"'` even if they occur in value",
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '"a"'},
              children: []
            },
            {
              quote: '"'
            }
          ),
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
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: 'a'},
              children: []
            },
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title="a"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if the alternative occurs',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: "'a'"},
              children: []
            },
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title="\'a\'"></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur less than the alternative',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: "'\"a'"},
              children: []
            },
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
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '"a\''},
              children: []
            },
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
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '"\'a\'"'},
              children: []
            },
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
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '"a"'},
              children: []
            },
            {
              allowDangerousCharacters: true,
              quoteSmart: true
            }
          ),
          '<i title=\'"a"\'></i>'
        )
      }
    )

    await t.test(
      'should quote attribute values with alternative quotes if they occur less than the primary',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '"\'a"'},
              children: []
            },
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
        toHtml(
          {type: 'element', tagName: 'i', properties: {id: 'a'}, children: []},
          {
            preferUnquoted: true
          }
        ),
        '<i id=a></i>'
      )
    })

    await t.test(
      'should keep quotes in `preferUnquoted` and impossible',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {id: 'a b'},
              children: []
            },
            {
              preferUnquoted: true
            }
          ),
          '<i id="a b"></i>'
        )
      }
    )

    await t.test(
      'should not add `=` when omitting quotes on empty values',
      async function () {
        assert.deepEqual(
          toHtml(
            {type: 'element', tagName: 'i', properties: {id: ''}, children: []},
            {
              preferUnquoted: true
            }
          ),
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
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {'3<5\0': 'a'},
            children: []
          }),
          '<i 3&#x3C;5&#x0;="a"></i>'
        )
      }
    )

    await t.test(
      'should encode entities in attribute values',
      async function () {
        assert.deepEqual(
          toHtml({
            type: 'element',
            tagName: 'i',
            properties: {title: '3<5\0'},
            children: []
          }),
          '<i title="3<5&#x0;"></i>'
        )
      }
    )

    await t.test(
      'should not encode characters in attribute names which cause parse errors, but work, in `allowParseErrors` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {'3=5\0': 'a'},
              children: []
            },
            {
              allowParseErrors: true
            }
          ),
          '<i 3&#x3D;5\0="a"></i>'
        )
      }
    )

    await t.test(
      'should not encode characters in attribute values which cause parse errors, but work, in `allowParseErrors` mode',
      async function () {
        assert.deepEqual(
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: '3=5\0'},
              children: []
            },
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
          toHtml(
            {
              type: 'element',
              tagName: 'i',
              properties: {title: "3'5"},
              children: []
            },
            {
              allowDangerousCharacters: true
            }
          ),
          '<i title="3\'5"></i>'
        )
      }
    )
  })
})

function toString() {
  return 'yup'
}
