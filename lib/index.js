import {html, svg} from 'property-information'
import {htmlVoidElements} from 'html-void-elements'
import {omission} from './omission/index.js'
import {one} from './one.js'

export function toHtml(node, options) {
  var settings = options || {}
  var quote = settings.quote || '"'
  var alternative = quote === '"' ? "'" : '"'

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  return one(
    {
      valid: settings.allowParseErrors ? 0 : 1,
      safe: settings.allowDangerousCharacters ? 0 : 1,
      schema: settings.space === 'svg' ? svg : html,
      omit: settings.omitOptionalTags && omission,
      quote,
      alternative,
      smart: settings.quoteSmart,
      unquoted: settings.preferUnquoted,
      tight: settings.tightAttributes,
      upperDoctype: settings.upperDoctype,
      tightDoctype: settings.tightDoctype,
      bogusComments: settings.bogusComments,
      tightLists: settings.tightCommaSeparatedLists,
      tightClose: settings.tightSelfClosing,
      collapseEmpty: settings.collapseEmptyAttributes,
      dangerous: settings.allowDangerousHtml || settings.allowDangerousHTML,
      voids: settings.voids || htmlVoidElements.concat(),
      entities: settings.entities || {},
      close: settings.closeSelfClosing,
      closeEmpty: settings.closeEmptyElements
    },
    node && typeof node === 'object' && 'length' in node
      ? {type: 'root', children: node}
      : node
  )
}
