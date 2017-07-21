import glob from 'glob'
import path from 'path'
import { exec as execJs } from 'shelljs'

import { NODE_BIN } from './config'

export default ({ buildLocation, sourceLocation, name }, tracker, cb) => {

  tracker.verbose(name, 'Compiling ......')

  const sourceFiles = glob
    .sync(`${sourceLocation}/**/*+(js|jsx)`, {
      ignore: `${sourceLocation}/node_modules/**/*.js`,
    })
    .map(to => path.relative(sourceLocation, to))

  const bCommand = `cd ${sourceLocation} && ` +
    'cross-env BABEL_ENV=cjs ' +
    `${path.resolve(NODE_BIN)}/babel ${sourceFiles.join(' ')} ` +
    `--out-dir ${path.resolve(buildLocation)}`


  execJs(bCommand, { silent: true, async: true }, cb)
}
