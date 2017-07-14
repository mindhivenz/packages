import glob from 'glob'
import path from 'path'
import { exit } from 'shelljs'

import { NODE_BIN } from './config'
import { log, logError, exec, execLoud } from './utils'

export default (packageData) => {
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
  const bCode = exec(bCommand)
  if (bCode !== 0) {
    logError('...failed')
    exit(execLoud(bCommand))
  }
}
