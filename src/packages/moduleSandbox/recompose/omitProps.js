//@flow
import omit from 'lodash/fp/omit'
import mapProps from 'recompose/mapProps'

export default (keys: Array<string>) => mapProps(props => omit(keys, props))
