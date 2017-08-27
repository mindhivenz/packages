//@flow
import compose from 'recompose/compose'
import branch from 'recompose/branch'
import renderNothing from 'recompose/renderNothing'
import omitProps from './omitProps'

export default (propName: string) => compose(
  branch((props: {}) => !!props[propName], renderNothing),
  omitProps([propName]),
)
