import omit from 'lodash/fp/omit'
import mapProps from 'recompose/mapProps'

export default keys => mapProps(props => omit(keys, props))
