import { isEqual } from 'lodash'
import { Component } from 'react'
import { jss } from 'react-jss'
import { createEagerElement, getDisplayName } from 'recompose'

const classSheetInjector = (classesName = 'classes') => (BaseComponent) => {
  let classSheet
  let instanceCount = 0
  let updateId = 0

  return class extends Component {
    static displayName = 'applyTheme-classSheet'
    instanceUpdateId = 0

    constructor(props) {
      super(props)
      if (instanceCount === 0) {
        this.attachSheet(props.themeStyles)
      }
      instanceCount += 1
    }

    componentWillUpdate(nextProps) {
      if (! isEqual(this.props.themeStyles, nextProps.themeStyles)) {
        if (this.instanceUpdateId === updateId) {
          this.detachSheet()
          this.attachSheet(nextProps.themeStyles)
          updateId += 1
        }
        this.instanceUpdateId = updateId
      }
    }

    componentWillUnmount() {
      instanceCount -= 1
      if (instanceCount === 0) {
        this.detachSheet()
      }
    }

    render() {
      const { themeStyles: _, ...rest } = this.props // eslint-disable-line no-unused-vars
      const { classes } = classSheet
      return createEagerElement(BaseComponent, { [classesName]: classes, ...rest })
    }

    attachSheet(themeStyles) {
      classSheet = jss.createStyleSheet(themeStyles, {
        link: true,
        meta: `${getDisplayName(BaseComponent)}-classSheet`

      }).attach()
    }

    detachSheet() {
      jss.removeStyleSheet(classSheet)
      classSheet = undefined
    }
  }
}

export default classSheetInjector

