import jsonfile from 'jsonfile'
import path from 'path'

export const NODE_BIN = './node_modules/.bin'
export const CONFIG_FILE = 'mhpconfig.json'
const CONFIG_PATH = path.resolve('mhpconfig.json')
const configJson = jsonfile.readFileSync(CONFIG_PATH)

export default {
  ...configJson,
  rootPath: path.dirname(CONFIG_PATH),
  basePackageSource: path.resolve(configJson.basePackage)
}

