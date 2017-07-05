import { isEqual } from 'lodash'
import { Component } from 'react'
import { jss } from 'react-jss'
import { createEagerElement, getDisplayName } from 'recompose'

const instanceSheetInjector = (classesName = 'classes') => BaseComponent => class extends Component {
  static displayName = 'applyTheme-instanceSheet'
  instanceSheet

  constructor(props) {
    super(props)
    this.attachSheet(props.themeStyles)
  }

  componentWillUpdate(nextProps) {
    if (! isEqual(this.props.themeStyles, nextProps.themeStyles)) {
      this.detachSheet()
      this.attachSheet(nextProps.themeStyles)
    }
  }

  componentWillUnmount() {
    this.detachSheet()
  }

  render() {
    const { themeStyles: _, ...rest } = this.props // eslint-disable-line no-unused-vars
    const { classes } = this.instanceSheet
    return createEagerElement(BaseComponent, { [classesName]: classes, ...rest })
  }

  attachSheet(themeStyles) {
    this.instanceSheet = jss.createStyleSheet(themeStyles, {
      link: true,
      meta: `${getDisplayName(BaseComponent)}-instanceSheet`
    }).attach()
  }

  detachSheet() {
    jss.removeStyleSheet(this.instanceSheet)
    this.instanceSheet = undefined
  }
}

export default instanceSheetInjector
