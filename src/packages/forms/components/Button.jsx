import hideIf from '@mindhive/framework/recompose/hideIf'
import {CtxButton} from '../internal/ctxComponents'

export default
  hideIf('hide')
  (CtxButton)
