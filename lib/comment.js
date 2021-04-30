import {stringifyEntities} from 'stringify-entities'

export function comment(ctx, node) {
  // See: <https://html.spec.whatwg.org/multipage/syntax.html#comments>
  return ctx.bogusComments
    ? '<?' +
        stringifyEntities(
          node.value,
          Object.assign({}, ctx.entities, {subset: ['>']})
        ) +
        '>'
    : '<!--' + node.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + '-->'

  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, ctx.entities, {subset: ['<', '>']})
    )
  }
}
