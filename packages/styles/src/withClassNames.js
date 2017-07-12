import withProps from 'recompose/withProps'
import classNamesHelper from 'classnames'
import fromPairs from 'lodash/fromPairs'

export default (propsMapper, { propName = 'classNames', log } = {}) => withProps(
  (props) => {
    let result
    const classNames = propsMapper(props)
    if (typeof classNames === 'string') {
      result = classNames
    } else if (Object.prototype.toString.call(classNames) === '[object Array]') {
      result = classNamesHelper(classNames)
    } else if (typeof classNames === 'object') {
      result = fromPairs(Object.keys(classNames).map((key) => [key, classNamesHelper(classNames[key])]))
    } else {
      console.warn(`Unhandled classNames type returned: ${typeof classNames}`, classNames)
    }
    if (log) console.log(result)
    return result ? { [propName]: result } : undefined
  }
)
