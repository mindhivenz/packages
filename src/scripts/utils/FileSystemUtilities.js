import pathExists from 'path-exists'
import log from 'npmlog'
import fs from 'fs'


const pathExistsSync = (filePath) => {
  log.silly('existsSync', filePath)
  return pathExists.sync(filePath)
}

const _writeFileSync = (filePath, string) => {
  log.silly('existsSync', filePath)
  fs.writeFileSync(filePath, string, 'utf8')
}


export default {
  pathExistsSync,
  writeFileSync: _writeFileSync,
}
