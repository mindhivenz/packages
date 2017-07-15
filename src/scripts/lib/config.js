import jsonfile from 'jsonfile'

export const NODE_BIN = './node_modules/.bin'
export const CONFIG_PATH = 'mhpconfig.json'
export const configJson = jsonfile.readFileSync(CONFIG_PATH)
export default {
  ignore: configJson.ignore,
  additionalFiles: configJson.additionalFiles,
  sourcePath: configJson.sourcePath,
  basePackage: configJson.basePackage,
  outPath: configJson.outPath,
  registry: configJson.registry,
}

