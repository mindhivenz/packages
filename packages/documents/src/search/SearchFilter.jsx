import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

import SearchIcon from './SearchIcon'
import { injectStylesSheet } from './SearchStyles'

class SearchFilter extends Component {

  state = {
    searchText: '',
  }

  handleChange = (event) => {
    const searchText = event.target.value

    // Make sure that we have a new searchText.
    // Fix an issue with a Cordova Webview
    if (searchText === this.state.searchText) {
      return
    }

    this.setState({
      searchText,
    }, () => {
      this.props.onSearch(searchText)
    })
  }

  render() {
    const {
      styles,
      hintText,
      fullWidth = false,
      searching = false,
    } = this.props
    const { searchText } = this.state
    return (
      <div style={styles.container}>
        <SearchIcon searching={searching} />
        <TextField
          ref="searchTextField"
          autoComplete="off"
          value={searchText}
          style={styles.textField}
          hintText={hintText || 'Filter list'}
          onChange={this.handleChange}
          autoFocus
          fullWidth={fullWidth}
        />
      </div>
    )
  }


}

export default injectStylesSheet(SearchFilter)
