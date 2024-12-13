import assert from 'node:assert/strict'
import test from 'node:test'
import {toHtml} from 'hast-util-to-html'

test('`doctype`', async function (t) {
  await t.test('should serialize doctypes', async function () {
    assert.deepEqual(toHtml({type: 'doctype'}), '<!doctype html>')
  })

  await t.test(
    'should serialize doctypes tightly in `tightDoctype` mode',
    async function () {
      assert.deepEqual(
        toHtml({type: 'doctype'}, {tightDoctype: true}),
        '<!doctypehtml>'
      )
    }
  )

  await t.test(
    'should serialize uppercase doctypes in `upperDoctype` mode',
    async function () {
      assert.deepEqual(
        toHtml({type: 'doctype'}, {upperDoctype: true}),
        '<!DOCTYPE html>'
      )
    }
  )
})
