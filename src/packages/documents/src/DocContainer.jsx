import React from 'react'

import Paper from 'material-ui/Paper'

import SearchFilter from './search/SearchFilter'
import DocAddFab from './DocAddFab'


const DocContainer = ({
  addFab,
  search,
  onSearch = () => {},
  children,
  style,
}) =>
  <Paper zDepth={1} style={style}>
    {addFab &&
    <DocAddFab addFab={addFab} />
    }
    {search || onSearch ?
      <SearchFilter onSearch={onSearch} />
      :
      <div>&nbsp;</div>
    }
    {children}
  </Paper>

export default DocContainer

