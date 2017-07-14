import React from 'react'
import { ListItem } from 'material-ui/List'
import withHover from '@mindhive/components/withHover'

import { withStyles } from '@mindhive/styles'

import { renderDocListIcon } from './DocListIcon'

const DocView = ({
  leftIcon,

  disabled,
  hovered,

  primaryText,
  secondaryText,
  leftAvatar,
  rightAvatar,
  rightIconButton,
  onTouchTap,
  styles,

  children,
}) =>
  <ListItem
    disableTouchRipple
    disableFocusRipple

    leftIcon={leftIcon && renderDocListIcon(leftIcon, { hovered, disabled })}
    primaryText={primaryText && <div style={styles.primaryText}>{primaryText}</div>}
    secondaryText={secondaryText && <div style={styles.secondaryText}>{secondaryText}</div>}
    leftAvatar={leftAvatar}
    rightAvatar={rightAvatar}
    rightIconButton={rightIconButton}
    onTouchTap={onTouchTap}
    style={styles.listItemStyle}
  >
    {children}
  </ListItem>

const mapThemeToStyles = ({
  docList: { primaryTextHoveredColor, primaryTextDisabledColor, secondaryTextDisabledColor },
  paper,
}, {
  disabled,
  hovered,
  containerStyle,
}) => {
  const hoverStyles = {
    zDepth: 1,
    ...paper,
    boxShadow: paper.zDepthShadows[0],
    borderRadius: '2px',
    transform: 'scale(1.015, 1)',
    position: 'relative',
  }
  return ({
    listItemStyle: {
      ...(hovered ? hoverStyles : {}),
      ...containerStyle,
    },
    primaryText: {
      color: disabled ? primaryTextDisabledColor
        : hovered ? primaryTextHoveredColor
        : 'inherit',
    },
    secondaryText: {
      color: disabled ? secondaryTextDisabledColor : 'inherit',
    },
  })
}

export default withHover()(
  withStyles(mapThemeToStyles)(DocView)
)

