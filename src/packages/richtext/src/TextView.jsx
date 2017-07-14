import React from 'react'
import { compose, branch, renderNothing, mapProps, withProps } from 'recompose'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import { StyledHtml } from '@mindhive/styles'

const TextView = ({
  rawHtml,
  style,
}) =>
  <StyledHtml style={style} rawHtml={rawHtml} />


export default compose(
  withProps(({ data }) => ({
    content: convertFromRaw(JSON.parse(data)),
  })),
  branch(
    ({ content }) => ! (content.hasText()),
    renderNothing,
  ),
  mapProps(({ content, style }) => ({
    style,
    rawHtml: stateToHTML(content).replace(/<p><br><\/p>/g, ''),
  })),
)(TextView)
