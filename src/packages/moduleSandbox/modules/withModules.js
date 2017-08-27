import { app } from '@mindhive/di'
import withProps from 'recompose/withProps'

export default modulesMapper => withProps(props => modulesMapper(app(), props))
