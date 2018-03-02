import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import { observer } from 'mobx-react'

import withStyles from 'material-ui/styles/withStyles'

import Toolbar from 'material-ui/Toolbar'

const styles = theme => ({
  root: {
    display: 'flex',
    height: 48,
    width: '100%',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary[500]
        : theme.palette.primary[800],
  },
})

const TitleBar = ({ children, classes, ...rest }) =>
  <Toolbar className={classes.root} {...rest}>
    {children}
  </Toolbar>

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
}

TitleBar.defaultProps = {
  color: 'contrast',
}
export default compose(withStyles(styles), observer)(TitleBar)
