import jsonfile from 'jsonfile'
import path from 'path'

export const NODE_BIN = './node_modules/.bin'
export const CONFIG_PATH = 'mhpconfig.json'
export const configJson = jsonfile.readFileSync(CONFIG_PATH)
export default {

  rootPath: path.dirname(CONFIG_PATH),
  ignore: configJson.ignore,
  additionalFiles: configJson.additionalFiles,
  sourcePath: configJson.sourcePath,
  basePackage: configJson.basePackage,
  outPath: configJson.outPath,
  registry: configJson.registry,
}

