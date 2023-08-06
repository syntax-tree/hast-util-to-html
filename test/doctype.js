import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`doctype`', () => {
  assert.deepEqual(
    toHtml(u('doctype')),
    '<!doctype html>',
    'should serialize doctypes'
  )

  assert.deepEqual(
    toHtml(u('doctype'), {tightDoctype: true}),
    '<!doctypehtml>',
    'should serialize doctypes tightly in `tightDoctype` mode'
  )

  assert.deepEqual(
    toHtml(u('doctype'), {upperDoctype: true}),
    '<!DOCTYPE html>',
    'should serialize uppercase doctypes in `upperDoctype` mode'
  )
})
