// @flow

import compose from 'recompose/compose'
import branch from 'recompose/branch'
import omitProps from '../utils/omitProps'
import renderNothing from 'recompose/renderNothing'

export const SHOW_BUTTON_PROP = 'showButton'
export const BUTTON_PRIMARY = 'primary'
export const BUTTON_SECONDARY = 'secondary'

export const makeProps = (buttonType: string, props: {}, options?: {}) =>
  options
    ? {
        buttonType,
        [SHOW_BUTTON_PROP]: true,
        ...props,
        ...options,
      }
    : {
        [SHOW_BUTTON_PROP]: false,
      }

