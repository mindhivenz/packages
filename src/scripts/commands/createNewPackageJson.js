import jsonfile from 'jsonfile'
import path from 'path'

export default (packagePath, data) => {
  const file = path.resolve(packagePath, 'package.json')

  jsonfile.writeFileSync(file, Object.assign({}, data, jsonfile.readFileSync(file)), { spaces: 2 })

}

