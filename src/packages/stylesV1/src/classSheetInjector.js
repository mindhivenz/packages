import { Component } from 'react'
import isEqual from 'lodash/isEqual'
import { jss } from 'r'
import { createEagerElement, getDisplayName } from 'recompose'

const classSheetInjector = (classesName = 'classes') => (BaseComponent) => {
  let classSheet
  let instanceCount = 0
  let updateId = 0

  return class extends Component {
    classUpdateId = 0

    constructor(props) {
      super(props)
      if (instanceCount === 0) {
        this.attachSheet(props.themeStyles)
      }
      instanceCount += 1
    }

    componentWillUpdate(nextProps) {
      if (! isEqual(this.props.themeStyles, nextProps.themeStyles)) {
        if (this.classUpdateId === updateId) {
          this.detachSheet()
          this.attachSheet(nextProps.themeStyles)
          updateId += 1
        }
        this.classUpdateId = updateId
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
        meta: `${getDisplayName(BaseComponent)}-classSheet`,

      }).attach()
    }

    detachSheet() {
      jss.removeStyleSheet(classSheet)
      classSheet = undefined
    }
  }
}

export default classSheetInjector

