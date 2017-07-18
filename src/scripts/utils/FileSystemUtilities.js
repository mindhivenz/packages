import pathExists from 'path-exists'
import log from 'npmlog'


const pathExistsSync = (filePath) => {
  log.silly('existsSync', filePath)
  return pathExists.sync(filePath)
}

export default {
  pathExistsSync,
}
