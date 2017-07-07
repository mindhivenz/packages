import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { HotKeys } from 'react-hotkeys'
import { compose } from 'recompose'

import Overlay from 'material-ui/internal/Overlay'

import { ListItem } from 'material-ui/List'

import { Icon, ClearIcon } from '@mindhive/components/Icon'
import withStore from '@mindhive/mobx/withStore'

import { injectStylesSheet } from './edit/EditStyles'

import Buttons from './edit/Buttons'
import EditDomain from './edit/EditDomain'

const docEditContextTypes = {
  docEditForm: PropTypes.string,
}

export const withDocEditContext = (Comp) => {
  const component = (props, context) =>
    <Comp {...context} {...props} />
  component.contextTypes = docEditContextTypes
  return component
}

const animationOut = 100


const lastFocusId = 'DOC_EDIT_LAST_FOCUS'
const firstFocusId = 'DOC_EDIT_FIRST_FOCUS'

class DocEdit extends Component {

  static childContextTypes = docEditContextTypes
  autoFocusChild = undefined

  state = {
    show: false,
  }

  getChildContext() {
    return {
      docEditForm: this.props.form,
    }
  }

  componentDidMount() {
    this.handleOpen()
    // setTimeout(() => this.handleOpen(), 0)
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimeout)
    clearTimeout(this.leaveTimeout)
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback)
  }

  componentWillAppear(aCallBAck) {
    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, 30px, 0)',
      },
    })

    this.enterTimeout = setTimeout(() => {
      this.enterTimeout = null
      aCallBAck()
    }, 450) // matches transition duration
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    })

    this.leaveTimeout = setTimeout(() => {
      this.leaveTimeout = null
      callback()
    }, 450) // matches transition duration
  }

  handleClose(callback) {
    this.setState({
      show: false,
    })
    this.leaveTimeout = setTimeout(() => {
      this.leaveTimeout = null
      callback()
    }, animationOut) // matches transition duration
  }

  handleOpen() {
    this.setState({
      show: true,
    })
  }

  discardChanges = () => {
    this.handleClose(this.props.onCancel)
  }

  submitChanges = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.props.fields)
  }

  registerFirstFocus = (node) => {
    if (this.firstFocusable === undefined) {
      this.firstFocusable = node
    }
  }

  focusForward = (e) => {
    if (e.target.id === lastFocusId) {
      e.preventDefault()
      this.firstFocusable.getRenderedComponent().refs.component.input.focus()
    }
  }

  keyMap = {
    'focusForward': 'tab',
    'submitChanges': ['command+enter', 'ctrl+enter'],
    'discardChanges': 'esc',
  }

  handlers = {
    'focusForward': this.focusForward,
    'submitChanges': this.submitChanges,
    'discardChanges': this.discardChanges,
    'enter': () => {},
  }

  render() {
    const {
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
      error,
      pristine,
      handleSubmit,
    } = this.props


    const itemId = `${docType}-list-item-${id || 'new'}-selector`

    return (
      <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <Overlay autoLockScrolling={false} style={styles.overlay} show={isNew || ! pristine} />
        <ListItem
          disableTouchRipple
          disableFocusRipple

          style={Object.assign({}, styles.container, containerStyle, this.state.show ? styles.shown : styles.hidden)}
          id={itemId}
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
                props.ref = this.registerFirstFocus
                if (typeof child.type !== 'string') props.withRef = isFirstFocus
              }
              return React.cloneElement(child, props);
            })}

            <Buttons
              props={this.props}
              closeTouchTap={() => this.handleClose(onCancel)}
              lastFocusId={lastFocusId}
            />
          </form>
        </ListItem>
      </HotKeys>
    )
  }
}

const DocEditReduxForm = compose(
  reduxForm(),
  withStore({
    storeClass: EditDomain,
    propName: 'editDomain',
  }),
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
