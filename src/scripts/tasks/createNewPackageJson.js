import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { updatePackageJson } from '../package/packageUtils'

export default (packagePath, data) => updatePackageJson(packagePath, {
  ...pick(data, ['name', 'version']),
  ...omit(data, ['packageName', 'packageScope', 'name', 'version']),
})

