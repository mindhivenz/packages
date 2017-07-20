import glob from 'glob'
import path from 'path'
import { exit, exec as execJs } from 'shelljs'

import { NODE_BIN } from './config'
import { log, logError, logPackage, execLoud, execAsync } from './utils'

export default async ({ buildLocation, sourceLocation, name }) => {

  log('Compiling package...')

  const sourceFiles = glob
    .sync(`${sourceLocation}/**/*+(js|jsx)`, {
      ignore: `${sourceLocation}/node_modules/**/*.js`,
    })
    .map(to => path.relative(sourceLocation, to))

  const bCommand = `cd ${sourceLocation} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(NODE_BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(buildLocation)}`


  await execJs(bCommand, { silent: true, async: true }, (error) => {
    if (error) {
      // console.error(`exec error: ${error}`)
      exit(error)
    } else {
      logPackage(`Build ${name} finished!`)
    }
  })
  // processObj.stdout.on('data', e => {
    // gauge.pulse((packageData.name))
  // })
}
