import React from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

const DraftHtmlView = ({
  data,
  style,
}) => {
  const content = convertFromRaw(JSON.parse(data))
  let html = stateToHTML(content).replace(/<p><br><\/p>/g, '')
  return (
    content.hasText()
      ? <div style={style} dangerouslySetInnerHTML={{ __html: html }} />
      : null
  )
}

export default DraftHtmlView
