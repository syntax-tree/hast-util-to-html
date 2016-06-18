/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:to-hast
 * @fileoverview Transform MDAST to HAST.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var voids = require('html-void-elements');
var spaces = require('space-separated-tokens').stringify;
var commas = require('comma-separated-tokens').stringify;
var information = require('property-information');
var entities = require('stringify-entities');
var kebab = require('kebab-case');

/* Methods. */
var has = Object.prototype.hasOwnProperty;

/* Handlers. */
var handlers = {};

handlers.root = root;
handlers.element = element;
handlers.directive = directive;
handlers.comment = comment;
handlers.characterData = characterData;
handlers.text = text;
handlers.raw = raw;

/**
 * Check if content of `node` should be escaped.
 *
 * @param {Node} node - Node to check.
 * @return {boolean} - Whether `node` should be escaped.
 */
function isLiteral(node) {
    return node && (node.tagName === 'script' || node.tagName === 'style');
}

/**
 * Stringify one attribute.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {string} name - Attribute name.
 * @param {*} value - Attribute value.
 * @param {boolean} [isAttribute] - Whether `name` is
 *   an attribute.
 * @return {string} - Stringified attribute.
 */
function attribute(ctx, name, value) {
    var info = information(name) || {};
    var options = ctx.entities;

    if (
        (value === null || value === undefined || value !== value) ||
        (!value && info.boolean) ||
        (value === false && info.overloadedBoolean)
    ) {
        return '';
    }

    name = info.name || kebab(name);

    if (
        info.boolean ||
        (value === true && info.overloadedBoolean)
    ) {
        return entities(name, options);
    }

    if (typeof value === 'object' && 'length' in value) {
        value = (info.commaSeparated ? commas : spaces)(value);
    }

    return entities(name, options) + '="' +
        entities(String(value), options) + '"';
}

/**
 * Stringify all attributes.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {Object} props - Attributes.
 * @return {string} - Stringified attributes.
 */
function attributes(ctx, props) {
    var values = [];
    var key;
    var value;
    var result;

    for (key in props) {
        value = props[key];

        if (value === null || value === undefined) {
            continue;
        }

        result = attribute(ctx, key, value);

        if (result) {
            values.push(result);
        }
    }

    return values.join(' ');
}

/**
 * Stringify all children of `parent`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastNode} parent - Parent.
 * @return {string} - Stringified children.
 */
function all(ctx, parent) {
    var children = parent && parent.children;
    var length = children && children.length;
    var index = -1;
    var results = [];

    while (++index < length) {
        results[index] = one(ctx, children[index], parent);
    }

    return results.join('');
}

/**
 * Stringify `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastNode} node - Node.
 * @param {HastNode?} [parent] - Parent of `node`, when
 *   applicable.
 * @return {string} - Stringified `node`.
 * @throws {Error} - When `node` cannot be stringified.
 */
function one(ctx, node, parent) {
    var type = node && node.type;

    if (!type) {
        throw new Error('Expected node, not `' + node + '`');
    }

    if (!has.call(handlers, type)) {
        throw new Error('Cannot compile unknown node `' + type + '`');
    }

    return handlers[type](ctx, node, parent);
}

/**
 * Stringify a directive `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastDirective} node - Node.
 * @return {string} - Stringified `node`.
 */
function directive(ctx, node) {
    return '<' + node.value + '>';
}

/**
 * Stringify a comment `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastComment} node - Node.
 * @return {string} - Stringified `node`.
 */
function comment(ctx, node) {
    return '<!--' + node.value + '-->';
}

/**
 * Stringify `raw`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastCharacterData} node - Node.
 * @return {string} - Stringified `node`.
 */
function raw(ctx, node) {
    return ctx.dangerous ? node.value : text(ctx, node);
}

/**
 * Stringify a character-data `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastCharacterData} node - Node.
 * @return {string} - Stringified `node`.
 */
function characterData(ctx, node) {
    return '<![CDATA[' + node.value + ']]>';
}

/**
 * Stringify a text `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastText} node - Node.
 * @param {HastParent?} [parent] - Parent of `node`.
 * @return {string} - Stringified `node`.
 */
function text(ctx, node, parent) {
    return isLiteral(parent) ? node.value : entities(node.value, ctx.entities);
}

/**
 * Stringify a root `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastRoot} node - Node.
 * @return {string} - Stringified `node`.
 */
function root(ctx, node) {
    return all(ctx, node);
}

/**
 * Stringify an element `node`.
 *
 * @param {Object} ctx - Stringify configuration.
 * @param {HastElement} node - Node.
 * @return {string} - Stringified `node`.
 */
function element(ctx, node) {
    var attrs = attributes(ctx, node.properties);
    var content = all(ctx, node);
    var name = node.tagName;
    var value = '<' + name;
    var selfClosing = ctx.voids.indexOf(name.toLowerCase()) !== -1;

    if (attrs) {
        value += ' ' + attrs;
    }

    if (selfClosing && ctx.closeSelfClosing) {
        value += ' /';
    }

    value += '>' + content;

    if (!selfClosing) {
        value += '</' + name + '>';
    }

    return value;
}

/**
 * Wrapper.
 *
 * @param {HastNode} node - Node.
 * @param {Object} [options] - Configuration.
 * @return {string} - Stringified `node`.
 */
function wrapper(node, options) {
    var settings = options || {};
    var dangerous = settings.allowDangerousHTML;

    return one({
        dangerous: dangerous,
        voids: settings.voids || voids.concat(),
        entities: settings.entities || { escapeOnly: true },
        closeSelfClosing: settings.closeSelfClosing
    }, node);
}

/* Expose. */
module.exports = wrapper;
