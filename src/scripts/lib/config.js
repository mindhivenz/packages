import jsonfile from 'jsonfile'

export const NODE_BIN = './node_modules/.bin'
export const CONFIG_PATH = 'mhpconfig.json'
export const config = jsonfile.readFileSync(CONFIG_PATH)
export default jsonfile.readFileSync(CONFIG_PATH)
