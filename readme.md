# hast-util-to-html [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

<!--lint disable heading-increment list-item-spacing-->

Transform [HAST][] to HTML.

## Installation

[npm][npm-install]:

```bash
npm install hast-util-to-html
```

## Usage

Dependencies:

```javascript
var h = require('hastscript');
var toHTML = require('hast-util-to-html');
```

Transform:

```javascript
var tree = h('.alpha', [
  'bravo ',
  h('b', 'charlie'),
  ' delta ',
  h('a.echo', {
    download: true
  }, 'foxtrot')
]);
```

Yields:

```html
<div class="alpha">bravo <b>charlie</b> delta <a class="echo" download>foxtrot</a></div>
```

## API

### `toHTML(node[, options])`

Stringify the given [HAST node][hast].

###### `options.entities`

Configuration for [`stringify-entities`][stringify-entities]
(`Object`, default: `{}`).  Do not use `escapeOnly`, `attribute`, or
`subset` (`toHTML` already passes those).  However, `useNamedReferences`,
`useShortestReferences`, and `omitOptionalSemicolons` are all fine.

###### `options.voids`

Tag-names of elements to stringify without closing tag (`Array.<string>`,
default: [`html-void-elements`][html-void-elements]).

###### `options.quote`

Preferred quote to use (`'"'` or `'\''`, default: `'"'`).

###### `options.quoteSmart`

Use the other quote if that results in less bytes (`boolean`, default:
`false`).

###### `options.preferUnquoted`

Leave attributes unquoted if that results in less bytes (`boolean`,
default: `false`).

###### `options.omitOptionalTags`

Omit optional opening and closing tags (`boolean`, default: `false`).
For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>`
closing tags can be omitted.  The first because it’s followed by
another `li`, the last because it’s followed by nothing.

###### `options.collapseEmptyAttributes`

Collapse empty attributes: `class=""` is stringified as `class` instead
(`boolean`, default: `false`).  **Note**: boolean attributes, such as
`hidden`, are always collapsed.

###### `options.closeSelfClosing`

Close self-closing nodes with an extra slash (`/`): `<img />` instead of
`<img>` (`boolean`, default: `false`).

###### `options.tightSelfClosing`

Do not use an extra space when closing self-closing elements: `<img/>`
instead of `<img />` (`boolean`, default: `false`).  **Note**: Only used
if `closeSelfClosing: true`.

###### `options.tightCommaSeparatedLists`

Join known comma-separated attribute values with just a comma (`,`),
instead of padding them on the right as well (`,`) (`boolean`,
default: `false`).

###### `options.tightAttributes`

Join attributes together, without white-space, if possible:
`class="a b" title="c d"` is stringified as `class="a b"title="c d"`
instead to save bytes (`boolean`, default: `false`).  **Note**: creates
invalid (but working) markup.

###### `options.allowParseErrors`

Do not encode characters which trigger parse errors (even though they
work), to save bytes (`boolean`, default: `false`).  **Note**: creates
invalid (but working) markup.

###### `options.allowDangerousCharacters`

Do not encode some characters which cause XSS vulnerabilities in older
browsers (`boolean`, default: `false`).  **Note**: Only set this if you
completely trust the content.

###### `options.allowDangerousHTML`

Allow `raw` nodes and insert them as raw HTML.  When falsey, encodes
`raw` nodes (`boolean`, default: `false`).  **Note**: Only set this if
you completely trust the content.

## Related

*   [`hast-util-sanitize`][hast-util-sanitize]

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/hast-util-to-html.svg

[travis]: https://travis-ci.org/wooorm/hast-util-to-html

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/hast-util-to-html.svg

[codecov]: https://codecov.io/github/wooorm/hast-util-to-html

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/wooorm/hast

[html-void-elements]: https://github.com/wooorm/html-void-elements

[stringify-entities]: https://github.com/wooorm/stringify-entities

[hast-util-sanitize]: https://github.com/wooorm/hast-util-sanitize
