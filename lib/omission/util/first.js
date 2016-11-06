'use strict';

/* Dependencies. */
var after = require('./siblings').after;

/* Expose. */
module.exports = first;

/* Get the first child in `parent`. */
function first(parent, includeWhiteSpace) {
  return after(parent, -1, includeWhiteSpace);
}
