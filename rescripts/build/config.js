/* eslint-disable import/no-dynamic-require, no-console */
const jsonfile = require('jsonfile')

exports.NODE_BIN = './node_modules/.bin'
exports.CONFIG_PATH = 'mhpconfig.json'
exports.config = jsonfile.readFileSync(exports.CONFIG_PATH)
