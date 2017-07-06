import React from 'react'
import { SearchIcon as Icon } from '@mindhive/components/Icon'
import { injectStylesSheet } from './SearchStyles'
import SearchSpinner from './SearchSpinner'

const SearchIcon = ({
  styles,
  // hintText,
  // fullWidth = false,
  searching = false,
}) => searching
  ? <SearchSpinner />
  : <Icon style={styles.icon} />

export default injectStylesSheet(SearchIcon)
