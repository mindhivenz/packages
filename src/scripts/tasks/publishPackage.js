import glob from 'glob'
import path from 'path'
import jsonfile from 'jsonfile'
import {
  logBr,
  log,
  styleWhiteBold,
  styleError,
} from '../utils/CliUtils'
import config from '../commands/config'

import { exec as execJs } from 'shelljs'


const writeVersion = (location, version) => {
  const jsonPath = path.resolve(location, 'package.json')
  const jsonData = jsonfile.readFileSync(jsonPath)
  jsonfile.writeFileSync(jsonPath, Object.assign({}, jsonData, {version}), {spaces: 2})
}

const getExecOpts = (directory) => {
  const opts = {
    cwd: directory,
    env: Object.assign({}, process.env, {
      npm_config_registry: config.registry,
    }),
    silent: false,
    async: true,
  }
  log("getExecOpts", opts)
  return opts
}

export default (
  { updating },
  versions,
  logger
) => {


  if (updating) {
    logBr()
    updating.forEach(async pkg => {
      const { buildLocation, sourceLocation, npmName, version: currentVersion,  } = pkg
      logger.verbose(npmName, 'Publish ......')
      const newVersion = versions[npmName]
      logger.info(
        `${npmName}:`,
        `${currentVersion} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate()
          ? styleError('private')
          : ''}`
      )
      writeVersion(sourceLocation, newVersion)

      const bCommand = `cd ${buildLocation} && npm  publish`

      if (await execJs(bCommand, getExecOpts(buildLocation)) === 0) {
        logger.verbose(npmName, 'Success...')
        writeVersion(buildLocation, newVersion)
      }


    })
  }
  logBr()
}
