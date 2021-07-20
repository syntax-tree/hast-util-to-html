import test from 'tape'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`doctype`', (t) => {
  t.deepEqual(
    // @ts-ignore hast types out of date.
    toHtml(u('doctype')),
    '<!doctype html>',
    'should serialize doctypes'
  )

  t.deepEqual(
    // @ts-ignore hast types out of date.
    toHtml(u('doctype'), {tightDoctype: true}),
    '<!doctypehtml>',
    'should serialize doctypes tightly in `tightDoctype` mode'
  )

  t.deepEqual(
    // @ts-ignore hast types out of date.
    toHtml(u('doctype'), {upperDoctype: true}),
    '<!DOCTYPE html>',
    'should serialize uppercase doctypes in `upperDoctype` mode'
  )

  t.end()
})
