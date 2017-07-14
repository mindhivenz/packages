import { compose, withContext } from 'recompose'
import PropTypes from 'prop-types'

export default compose(
  withContext(
    { docEditForm: PropTypes.string },
    ({ form }) => ({ docEditForm: form }),
  ),
)
