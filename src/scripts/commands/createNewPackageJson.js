import jsonfile from 'jsonfile'
import path from 'path'
import pick from 'lodash/pick'

export default (packagePath, data) => {
  const file = path.resolve(packagePath, 'package.json')

  jsonfile.writeFileSync(file, Object.assign({}, {
    ...pick(data, ['name', 'author', 'description', 'keywords']),
  }, jsonfile.readFileSync(file)), { spaces: 2 })

}

