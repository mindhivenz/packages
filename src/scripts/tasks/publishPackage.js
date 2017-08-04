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

const getExecOpts = (directory) => ({
  cwd: directory,
  env: Object.assign({}, process.env, {
    npm_config_registry: config.registry,
  }),
  silent: true,
})

export default (
  { updating },
  versions,
  logger
) => {


  if (updating) {
    updating.forEach(pkg => {
      const { buildLocation, sourceLocation, npmName } = pkg
      logger.verbose(npmName, 'Publish ......')
      const newVersion = versions[npmName]
      writeVersion(buildLocation, newVersion)

      const bCommand = `cd ${buildLocation} && npm  publish`
      execJs(bCommand, getExecOpts(buildLocation), code => {
        if (code !== 0) throw new Error('Publish to NPM failed')
        writeVersion(sourceLocation, newVersion)
        logger.info(
          'Published to NPM:',
          `${npmName}@${newVersion}`
        )
      })
    })
  }
}
