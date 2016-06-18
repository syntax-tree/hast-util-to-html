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

Stringify the given [HAST][] tree.

###### Parameters

*   `node` ([`HASTNode`][hast]).
*   `options` (`object`, optional):

    *   `allowDangerousHTML` (`boolean`, default: `false`)
        — Whether to allow `raw` nodes and insert them as raw HTML.
        When falsey, encodes `raw` nodes.
    *   `entities` (`Object`, default: `{escapeOnly: true}`)
        — configuration for [`stringify-entities`][stringify-entities].
    *   `voids` (`Array.<string>`, default:
        [`html-void-elements`][html-void-elements])
        — Tag-names of elements to stringify without closing tag.
    *   `closeSelfClosing` (`boolean`, default: `false`)
        Whether to close self-closing nodes with an extra, superfluous
        slash (`/`): `<img />` instead of `<img>`.

###### Returns

`string`.

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
