import React from 'react'
import { observer } from 'mobx-react'

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import NoDocsLabel from './NoDocsLabel'


const mongoIdSelector = doc => doc._id

const DocList = ({
  vocab,
  title,
  hideWhenEmpty,
  noNewDocuments,
  documents = [],
  selected,
  docProps,
  DocEdit,
  editProps,
  DocView,
  viewProps,
  docIdSelector = mongoIdSelector,
}) => {
  const docComponents = documents.map((doc, index) => {
    const id = docIdSelector(doc)
    return selected.id === id
      ?
        <DocEdit
          {...docProps}
          {...editProps}
          selected={selected}
          key={`${id}.edit`}
          id={id}
          document={doc}
        />
      :
        <DocView
          {...docProps}
          {...viewProps}
          index={index}
          id={id}
          key={`${id}.view`}
          document={doc}
        />
  })
  if (! noNewDocuments && selected.isNew) {
    docComponents.splice(selected.atIndex, 0,
      <DocEdit
        {...docProps}
        {...editProps}
        selected={selected}
        key={`new-${selected.atIndex}`}
      />
    )
  }
  return selected.isNew || documents.length ?
    <div id={`${vocab.id}-list-selector`}>
      <List>
        {title ? <Subheader>{title}</Subheader> : null}
        {docComponents}
      </List>
    </div>
    :
    <NoDocsLabel hideWhenEmpty={hideWhenEmpty}>No {vocab.documents} defined</NoDocsLabel>
}

export default observer(DocList)
