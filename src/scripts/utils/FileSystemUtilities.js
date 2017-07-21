import { cp, test } from 'shelljs'
import log from 'npmlog'
import fs from 'fs'

const _pathExistsSync = (path) => {
  log.silly('existsSync', path)
  return test('-e', path)
  // return pathExists.sync(filePath)
}

const _writeFileSync = (filePath, string) => {
  log.silly('writeFileSync', filePath)
  fs.writeFileSync(filePath, string, 'utf8')
}

const _copySync = (fromPath, toPath) => {
  log.silly('copySync', fromPath, toPath)
  cp('-Rf', fromPath, toPath)
}

export default {
  pathExistsSync: _pathExistsSync,
  writeFileSync: _writeFileSync,
  copySync: _copySync,
}
