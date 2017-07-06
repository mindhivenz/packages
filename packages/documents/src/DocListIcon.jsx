import React from 'react'

import withStyles from '../../styles/src/withStyles'

const _DocListIcon = ({
  styles,
  children,

  style,  // MUI
}) =>
  React.cloneElement(React.Children.only(children), { style: Object.assign({}, style, styles) })

const mapThemeToStyles = ({
  docList: {
    iconColor,
    iconHoveredColor,
    iconHoveredOpacity,
  },
}, {
  hovered,
  disabled,
  color,
  hoverColor,
}) => {
  let actualColor = iconColor
  if (! disabled) {
    actualColor = hovered ? hoverColor || iconHoveredColor : color || iconColor
  }
  return ({
    color: actualColor,
    opacity: hovered ? iconHoveredOpacity : 1,
  })
}

const WithStylesComponent = withStyles(mapThemeToStyles)(_DocListIcon)


const DOC_LIST_ICON = 'DocListIcon'

export const renderDocListIcon = (component, params) =>
  component.type.mindhiveName === DOC_LIST_ICON ? React.cloneElement(component, params) : component


export default class DocListIcon extends React.Component {
  static mindhiveName = DOC_LIST_ICON

  render() {
    return <WithStylesComponent {...this.props} />
  }
}
