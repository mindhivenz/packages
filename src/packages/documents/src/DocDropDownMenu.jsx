import React from 'react'
import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'

import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import { PassPropsWrapper } from '@mindhive/components/muiUtils'

import { withStyles } from '@mindhive/styles'

const hiddenItemForEscKey = () =>
  <MenuItem
    style={{
      minHeight: 0,
      lineHeight: 0,
      height: 0,
    }}
  />

const DocDropDownMenu = ({
  stateIcons = [],
  menuItems = [],
  selectorId,
  iconColor,
  menuStyle,
  ...other
}) =>
  <PassPropsWrapper {...other}>
    { stateIcons.map(icon => icon) }
    { menuItems &&
    <IconMenu
      iconButtonElement={
        <IconButton
          id={`doc-list-item-icon-menu-${selectorId}-selector`}
        >
          <MoreVertIcon color={iconColor} />
        </IconButton>
      }
      useLayerForClickAway
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      menuStyle={menuStyle}
      {...other}
    >
      { menuItems.map(item => item) }
      {hiddenItemForEscKey()}
    </IconMenu>
    }
  </PassPropsWrapper>

const mapThemeToStyles = ({
  docDropDownMenu: {
    iconColor,
    backgroundColor,
  },
}) => ({
  icon: {
    color: iconColor
  },
  menu: {
    backgroundColor,
  }
})

export default compose(
  withStyles(mapThemeToStyles),
  mapProps(({theme, prepareStyles, styles, ...other}) => ({
    iconColor: styles.icon.color,
    menuStyle: styles.menu,
    ...other,
  }))
)(DocDropDownMenu)

