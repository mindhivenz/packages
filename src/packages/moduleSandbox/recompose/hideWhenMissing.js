//@flow
import hideWhen from './hideWhen'

export default (propName: string) => hideWhen(props => !(props && props[propName]))
