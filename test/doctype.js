'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`text`', function (t) {
  t.deepEqual(
    to(u('doctype')),
    '<!doctype>',
    'should serialize doctypes without `name`'
  )

  t.deepEqual(
    to(u('doctype', {name: 'html'})),
    '<!doctype html>',
    'should serialize doctypes with `name`'
  )

  t.deepEqual(
    to(u('doctype', {name: 'html'}), {tightDoctype: true}),
    '<!doctypehtml>',
    'should serialize doctypes with `name` tightly in `tightDoctype` mode'
  )

  t.deepEqual(
    to(u('doctype', {name: 'html'}), {upperDoctype: true}),
    '<!DOCTYPE html>',
    'should serialize uppercase doctypes in `upperDoctype` mode'
  )

  t.deepEqual(
    to(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD XHTML 1.0 Transitional//EN'
      })
    ),
    '<!doctype html public "-//W3C//DTD XHTML 1.0 Transitional//EN">',
    'should serialize doctypes with a public identifier'
  )

  t.deepEqual(
    to(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD XHTML 1.0 Transitional//EN'
      }),
      {tightDoctype: true}
    ),
    '<!doctypehtml public"-//W3C//DTD XHTML 1.0 Transitional//EN">',
    'should serialize doctypes with a public identifier tightly in `tightDoctype` mode'
  )

  t.deepEqual(
    to(u('doctype', {name: 'html', system: 'about:legacy-compat'})),
    '<!doctype html system "about:legacy-compat">',
    'should serialize doctypes with a system identifier'
  )

  t.deepEqual(
    to(u('doctype', {name: 'html', system: 'about:legacy-compat'}), {
      tightDoctype: true
    }),
    '<!doctypehtml system"about:legacy-compat">',
    'should serialize doctypes with a system identifier tightly in `tightDoctype` mode'
  )

  t.deepEqual(
    to(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD HTML 4.01//',
        system: 'http://www.w3.org/TR/html4/strict.dtd'
      })
    ),
    '<!doctype html public "-//W3C//DTD HTML 4.01//" "http://www.w3.org/TR/html4/strict.dtd">',
    'should serialize doctypes with both identifiers'
  )

  t.deepEqual(
    to(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD HTML 4.01//',
        system: 'http://www.w3.org/TR/html4/strict.dtd'
      }),
      {tightDoctype: true}
    ),
    '<!doctypehtml public"-//W3C//DTD HTML 4.01//""http://www.w3.org/TR/html4/strict.dtd">',
    'should serialize doctypes with both identifiers tightly in `tightDoctype` mode'
  )

  t.deepEqual(
    to(
      u('doctype', {
        name: 'html',
        system: 'taco"'
      })
    ),
    "<!doctype html system 'taco\"'>",
    'should quote smartly'
  )

  t.end()
})
