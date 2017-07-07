import React from 'react'
import { reduxForm } from 'redux-form'
import { HotKeys } from 'react-hotkeys'
import { compose, lifecycle } from 'recompose'

import Overlay from 'material-ui/internal/Overlay'

import { ListItem } from 'material-ui/List'

import { Icon } from '@mindhive/components/Icon'
import withStore from '@mindhive/mobx/withStore'

import { injectStylesSheet } from './edit/EditStyles'

import Buttons from './edit/Buttons'
import EditDomain from './edit/EditDomain'
import withDocEditContext from './withDocEditContext'

const lastFocusId = 'DOC_EDIT_LAST_FOCUS'

const DocEdit = ({
  editDomain,
  docType,
  docIcon,
  onCancel,
  containerStyle,

  showIcon = false,
  // auto
  styles,
  isNew,
  id,

  // react
  children,

  // redux-form
  extraButtons,
  processing,
  pristine,
  submitting,
  valid,
  error,
  handleSubmit,
}) =>
  <HotKeys keyMap={editDomain.keyMap} handlers={editDomain.handlers}>
    <Overlay autoLockScrolling={false} style={styles.overlay} show={isNew || ! pristine} />
    <ListItem
      disableTouchRipple
      disableFocusRipple

      style={Object.assign({}, styles.container, containerStyle, editDomain.show ? styles.shown : styles.hidden)}
      id={`${docType}-list-item-${id || 'new'}-selector`}
      leftIcon={showIcon ? <Icon ligature={docIcon} style={styles.icon} /> : null}
    >
      {error && <div style={styles.error}>{error.reason}</div>}
      <form
        id={`${docType}-form`}
        onSubmit={handleSubmit}
      >
        {React.Children.map(children, (child) => {
          if (! child) {
            return child
          }
          const isFirstFocus = child && child.props && child.props.autoFocus === true
          const props = {}
          if (isFirstFocus) {
            props.ref = editDomain.registerFirstFocus
            if (typeof child.type !== 'string') props.withRef = isFirstFocus
          }
          return React.cloneElement(child, props)
        })}

        <Buttons
          props={{ isNew, docType, extraButtons, processing, pristine, submitting, valid }}
          closeTouchTap={() => editDomain.handleClose(onCancel)}
          lastFocusId={lastFocusId}
        />
      </form>
    </ListItem>
  </HotKeys>

const DocEditReduxForm = compose(
  reduxForm(),
  withStore({
    storeClass: EditDomain,
    propName: 'editDomain',
  }),
  lifecycle({
    componentDidMount() {
      this.props.editDomain.componentDidMount()
    },
    componentWillUnmount() {
      this.props.editDomain.componentWillUnmount()
    },
  }),
  withDocEditContext,
  injectStylesSheet,
)(DocEdit)

export default ({
  document = {},
  docType = 'doc',
  id = document._id,
  ...otherProps
}) =>
  <DocEditReduxForm
    {...otherProps}
    document={document}
    docType={docType}
    isNew={! document._id}
    id={id}
    initialValues={document}
    form={`${docType}-form-${id || 'new'}`}
  />
