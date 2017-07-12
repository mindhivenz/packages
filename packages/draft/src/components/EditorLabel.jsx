import React from 'react'
import PropTypes from 'prop-types'
import transitions from 'material-ui/styles/transitions'
import { withStyles } from '@mindhive/styles'


const EditorLabel = ({
  className,
  children,
  htmlFor,
  styles,
  prepareStyles,
}) =>
  <label
    className={className}
    style={prepareStyles(styles.root)}
    htmlFor={htmlFor}
  >
    {children}
  </label>


const mapThemeToStyles = (
  {
    textField: {
      floatingLabelColor,
      hintColor,
      focusColor,
      errorColor,
    },
  }, {
    disabled,
    focused,
    shrink,
    shrinkStyle,
    style,
    errorText,
  }) => {
  const defaultStyles = {
    position: 'absolute',
    lineHeight: '22px',
    top: 24,
    transition: transitions.easeOut(),
    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
    cursor: disabled ? 'not-allowed' : 'text',
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none',
  }

  const shrinkStyles = shrink ?
    Object.assign(
      {
        transform: 'scale(0.75) translate(0, -24px)',
        pointerEvents: 'none',
      },
      shrinkStyle)
    : null

  return {
    root: Object.assign(
      {
        color: focused ? (errorText ? errorColor : focusColor) : hintColor,
      },
      defaultStyles,
      style,
      shrinkStyles
    ),
  }
}

EditorLabel.propTypes = {
  /**
   * The label contents.
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Disables the label if set to true.
   */
  disabled: PropTypes.bool,
  /**
   * The id of the target element that this label should refer to.
   */
  htmlFor: PropTypes.string,
  /**
   * Callback function for when the label is selected via a touch tap.
   */
  onTouchTap: PropTypes.func,
  /**
   * True if the floating label should shrink.
   */
  shrink: PropTypes.bool,
  /**
   * Override the inline-styles of the root element when focused.
   */
  shrinkStyle: PropTypes.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

EditorLabel.defaultProps = {
  disabled: false,
  shrink: false,
};

export default withStyles(mapThemeToStyles)(EditorLabel)
