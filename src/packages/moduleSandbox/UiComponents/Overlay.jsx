import React from 'react'
import compose from 'recompose/compose'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import withStyles from 'material-ui/styles/withStyles'


const styles = theme => ({
  root: {
    zIndex: theme.zIndex.dialogOverlay,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    backgroundColor: theme.palette.common.lightBlack,
    transition: theme.transitions.create('opacity'),
    willChange: 'opacity',
    opacity: 0,
    pointerEvents: 'none',
  },
  show: {
    pointerEvents: 'all',
    opacity: 1,
  }
})

const Overlay = ({ classes, show }) =>
    <div className={classNames(classes.root, {[classes.show]: show})} />

export default compose(withStyles(styles), observer)(Overlay)
