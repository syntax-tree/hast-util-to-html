import {text} from './text.js'

export function raw(ctx, node) {
  return ctx.dangerous ? node.value : text(ctx, node)
}
