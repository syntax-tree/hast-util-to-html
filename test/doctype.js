import assert from 'node:assert/strict'
import test from 'node:test'
import {toHtml} from 'hast-util-to-html'
import {u} from 'unist-builder'

test('`doctype`', async function (t) {
  await t.test('should serialize doctypes', async function () {
    assert.deepEqual(toHtml(u('doctype')), '<!doctype html>')
  })

  await t.test(
    'should serialize doctypes tightly in `tightDoctype` mode',
    async function () {
      assert.deepEqual(
        toHtml(u('doctype'), {tightDoctype: true}),
        '<!doctypehtml>'
      )
    }
  )

  await t.test(
    'should serialize uppercase doctypes in `upperDoctype` mode',
    async function () {
      assert.deepEqual(
        toHtml(u('doctype'), {upperDoctype: true}),
        '<!DOCTYPE html>'
      )
    }
  )
})
