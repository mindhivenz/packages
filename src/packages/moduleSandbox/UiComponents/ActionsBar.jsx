import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import getContext from 'recompose/getContext'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Toolbar from 'material-ui/Toolbar'
import withStyles from 'material-ui/styles/withStyles'


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row-reverse',
    height: 48,
    width: '100%',
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: theme.spacing.unit * 3,
  },
  dense: {
    marginTop: 0,
    fontSize: 1,
  },
})

function ActionsBar({
  classes,
  className: classNameProp,
  dense,
  children,
  ...other
}) {
  const rootClassNames = classNames(
    classes.root,
    { [classes.dense]: dense },
    classNameProp
  )

  return (
    <Toolbar className={rootClassNames} {...other}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { dense })
      )}
    </Toolbar>
  )
}

ActionsBar.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ActionsBar.displayName = 'ActionsBar'

export default compose(
  withStyles(styles, { name: 'ActionsBar' }),
  getContext({
    dense: PropTypes.bool,
  }),
  observer
)(ActionsBar)
