import React from 'react'

import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import { PassPropsWrapper } from '@mindhive/components/muiUtils'

import withStyles from '../../styles/src/withStyles'


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
          tooltip="more"
        >
          <MoreVertIcon color={styles.color} />
        </IconButton>
      }
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      { menuItems.map(item => item) }
    </IconMenu>
    }
  </PassPropsWrapper>

const mapThemeToStyles = ({
  docDropDownMenu: {
    iconColor,
  },
}) => ({
  color: iconColor,
})

export default withStyles(mapThemeToStyles)(DocDropDownMenu)

