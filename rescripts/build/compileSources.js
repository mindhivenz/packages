const glob = require('glob')
const path = require('path')
const { exit } = require('shelljs')

const { NODE_BIN } = require('./config')
const { log, logError, exec, execLoud } = require('./utils')

exports.default = (packageData) => {
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
