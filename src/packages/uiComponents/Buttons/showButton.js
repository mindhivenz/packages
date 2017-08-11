// @flow

import compose from 'recompose/compose'
import branch from 'recompose/branch'
import omitProps from '../utils/omitProps'
import renderNothing from 'recompose/renderNothing'

export const SHOW_BUTTON_PROP = 'showButton'

export default compose(
  branch(({ showButton }) => {
    return !showButton
  }, renderNothing),
  omitProps([SHOW_BUTTON_PROP]),
)
