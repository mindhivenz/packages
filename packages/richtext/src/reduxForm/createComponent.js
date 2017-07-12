import { Component, createElement } from 'react'

export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: 'component'
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}
