import {stringifyEntities} from 'stringify-entities'

export function text(ctx, node, index, parent) {
  // Check if content of `node` should be escaped.
  return parent && (parent.tagName === 'script' || parent.tagName === 'style')
    ? node.value
    : stringifyEntities(
        node.value,
        Object.assign({}, ctx.entities, {subset: ['<', '&']})
      )
}
