import pathExists from 'path-exists'
import log from 'npmlog'
import fs from 'fs'
import { cp } from 'shelljs'


const pathExistsSync = (filePath) => {
  log.silly('existsSync', filePath)
  return pathExists.sync(filePath)
}

const _writeFileSync = (filePath, string) => {
  log.silly('writeFileSync', filePath)
  fs.writeFileSync(filePath, string, 'utf8')
}

const _copySync = async (fromPath, toPath) => {
  log.silly('copySync', fromPath, toPath)
  cp('-Rf', fromPath, toPath)
}

export default {
  pathExistsSync,
  writeFileSync: _writeFileSync,
  copySync: _copySync,
}
