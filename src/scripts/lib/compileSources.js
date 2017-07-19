import glob from 'glob'
import path from 'path'
import { exit, exec as execJs } from 'shelljs'

import { NODE_BIN } from './config'
import { log, logError, logPackage, execLoud, execAsync } from './utils'

export default async (packageData) => {
  const sourceDir = packageData.src.dir
  const outDir = packageData.out.dir

  log('Compiling package...')

  const sourceFiles = glob
    .sync(`${sourceDir}/**/*+(js|jsx)`, {
      ignore: `${sourceDir}/node_modules/**/*.js`,
    })
    .map(to => path.relative(sourceDir, to))

  const bCommand = `cd ${sourceDir} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(NODE_BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(outDir)}`


  await execJs(bCommand, { silent: true, async: true }, (error) => {
    if (error) {
      // console.error(`exec error: ${error}`)
      exit(error)
    } else {
      logPackage(`Build ${packageData.name} finished!`)
    }
  })
  // processObj.stdout.on('data', e => {
    // gauge.pulse((packageData.name))
  // })
}
