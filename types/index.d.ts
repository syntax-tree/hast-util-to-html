// TypeScript Version: 3.0

import {Node} from 'unist'
import stringifyEntities = require('stringify-entities')

declare namespace hastUtilToHtml {
  interface HastUtilToHtmlOptions {
    /**
     * Whether the *root* of the *tree* is in the `'html'` or `'svg'` space (enum, `'svg'` or `'html'`, default: `'html'`).
     *
     * If an `svg` element is found in the HTML space, `toHtml` automatically switches to the SVG space when entering the element, and switches back when exiting.
     */
    space: 'html' | 'svg'

    /**
     * Configuration for `stringify-entities` (`Object`, default: `{}`).
     * Do not use `escapeOnly`, `attribute`, or `subset` (`toHtml` already passes those, so they won’t work).
     * However, `useNamedReferences`, `useShortestReferences`, and `omitOptionalSemicolons` are all fine.
     */
    entities: Partial<stringifyEntities.StringifyEntitiesOptions>

    /**
     * Tag names of *elements* to stringify without closing tag(`Array.<string>`, default: `html-void-elements`).
     *
     * Not used in the SVG space.
     */
    voids: string[]

    /**
     * Use an `<!DOCTYPE…` instead of `<!doctype…`.
     * Useless except for XHTML (`boolean`, default: `false`).
     */
    upperDoctype: boolean

    /**
     * Preferred quote to use (`'"'` or `'\''`, default: `'"'`).
     */
    quote: string

    /**
     * Use the other quote if that results in less bytes (`boolean`, default: `false`).
     */
    quoteSmart: boolean

    /**
     * Leave attributes unquoted if that results in less bytes (`boolean`, default: `false`).
     *
     * Not used in the SVG space.
     */
    preferUnquoted: boolean

    /**
     * Omit optional opening and closing tags (`boolean`, default: `false`).
     * For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>` closing tags can be omitted.
     * The first because it’s followed by another `li`, the last because it’s followed by nothing.
     *
     * Not used in the SVG space.
     */
    omitOptionalTags: boolean

    /**
     * Collapse empty attributes: `class=""` is stringified as `class` instead (`boolean`, default: `false`).
     * **Note**: boolean attributes, such as `hidden`, are always collapsed.
     *
     * Not used in the SVG space.
     */
    collapseEmptyAttributes: boolean

    /**
     * Close self-closing nodes with an extra slash (`/`): `<img />` instead of `<img>` (`boolean`, default: `false`).
     * See `tightSelfClosing` to control whether a space is used before the slash.
     *
     * Not used in the SVG space.
     */
    closeSelfClosing: boolean

    /**
     * Close SVG elements without any content with slash (`/`) on the opening tag instead of an end tag: `<circle />` instead of `<circle></circle>` (`boolean`, default: `false`).
     * See `tightSelfClosing` to control whether a space is used before the slash.
     *
     * Not used in the HTML space.
     */
    closeEmptyElements: boolean

    /**
     * Do not use an extra space when closing self-closing elements: `<img/>` instead of `<img />` (`boolean`, default: `false`).
     * **Note**: Only used if `closeSelfClosing: true` or `closeEmptyElements: true`.
     */
    tightSelfClosing: boolean

    /**
     * Join known comma-separated attribute values with just a comma (`,`), instead of padding them on the right as well (`,·`, where `·` represents a space) (`boolean`, default: `false`).
     */
    tightCommaSeparatedLists: boolean

    /**
     * Join attributes together, without white-space, if possible: `class="a b" title="c d"` is stringified as `class="a b"title="c d"` instead to save bytes (`boolean`, default: `false`).
     * **Note**: creates invalid (but working) markup.
     *
     * Not used in the SVG space.
     */
    tightAttributes: boolean

    /**
     * Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of `<!doctype html>` to save bytes (`boolean`, default: `false`).
     * **Note**: creates invalid (but working) markup.
     */
    tightDoctype: boolean

    /**
     * Do not encode characters which cause parse errors (even though they work), to save bytes (`boolean`, default: `false`).
     * **Note**: creates invalid (but working) markup.
     *
     * Not used in the SVG space.
     */
    allowParseErrors: boolean

    /**
     * Do not encode some characters which cause XSS vulnerabilities in older browsers (`boolean`, default: `false`).
     * **Note**: Only set this if you completely trust the content.
     */
    allowDangerousCharacters: boolean

    /**
     * Allow `raw` nodes and insert them as raw HTML.
     * When falsey, encodes `raw` nodes (`boolean`, default: `false`).
     * **Note**: Only set this if you completely trust the content.
     */
    allowDangerousHTML: boolean
  }
}

/**
 * Stringify the given **hast** *tree*.
 */
declare function hastUtilToHtml(
  tree: Node,
  options?: Partial<hastUtilToHtml.HastUtilToHtmlOptions>
): string

export = hastUtilToHtml
