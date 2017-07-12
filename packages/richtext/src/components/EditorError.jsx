import React from 'react'
import { withStyles } from '@mindhive/styles'

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

    return (<div style={prepareStyles(styles.error)}>{errorText || this.state.lastErrorText}</div>)

  }
}


const mapThemeToStyles = ({
  textField: {
    errorColor,
  },
}, {
  errorText,
}) => {
  const scale = errorText ? 1 : 0
  const fontSize = 12
  return ({
    error: {
      position: 'relative',
      bottom: -8,
      fontSize: fontSize,
      fontWeight: 400,
      lineHeight: `${fontSize}px`,
      color: errorColor,
      transition: 'transform 450ms ease-out',
      transform: `scaleY(${scale})`,
    },
  });
}

export default withStyles(mapThemeToStyles)(EditorError)
