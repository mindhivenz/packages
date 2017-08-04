import React from 'react'

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
  styles,
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
          <MoreVertIcon color={styles.icon.color} />
        </IconButton>
      }
      useLayerForClickAway
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      menuStyle={styles.menu}
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

export default withStyles(mapThemeToStyles)(DocDropDownMenu)

