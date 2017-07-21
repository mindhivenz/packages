import jsonfile from 'jsonfile'
import path from 'path'

export const NODE_BIN = './node_modules/.bin'
export const CONFIG_FILE = 'mhpconfig.json'
export const CONFIG_PATH = path.resolve('mhpconfig.json')
const configJson = jsonfile.readFileSync(CONFIG_PATH)
configJson.rootPath = path.dirname(CONFIG_PATH)
configJson.basePackageSource = path.resolve(configJson.basePackage, 'src')
configJson.basePackageBuild = path.resolve(configJson.basePackage, 'build')

export default configJson

