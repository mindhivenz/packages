import hideIf from '@mindhive/module-sandbox/recompose/hideIf'
import {CtxButton} from '../internal/ctxComponents'

export default
  hideIf('hide')
  (CtxButton)
