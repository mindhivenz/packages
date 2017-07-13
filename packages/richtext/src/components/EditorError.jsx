import React from 'react'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
// import { compose, withPropsOnChange, branch, renderNothing, mapProps, withProps } from 'recompose'

import { injectErrorStyles } from './EditorStyles'

class EditorError extends React.Component {

  state = {
    lastErrorText: '.',
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errorText && nextProps.errorText !== this.state.lastErrorText) {
      this.setState({ lastErrorText: nextProps.errorText })
    }
  }

  render() {
    const {
      errorText,
      styles,
      prepareStyles,
    } = this.props

    return (<div style={prepareStyles(styles)}>{errorText || this.state.lastErrorText}</div>)

  }
}


export default compose(
  injectErrorStyles,
  observer,
)(EditorError)
