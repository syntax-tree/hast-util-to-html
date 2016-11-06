'use strict';

/* Dependencies. */
var has = require('has');

/* Expose. */
module.exports = omission;

/* Factory to check if a given node can have a tag omitted. */
function omission(handlers) {
  return omit;

  /* Check if a given node can have a tag omitted.   */
  function omit(node, index, parent) {
    var name = node.tagName;
    var fn = has(handlers, name) ? handlers[name] : false;

    return fn ? fn(node, index, parent) : false;
  }
}
