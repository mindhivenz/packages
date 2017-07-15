import path from 'path'
import { cp, test } from 'shelljs'
import { log } from './utils'

import config from './config'

export default (packageData) => {
  const sourceDir = packageData.src.dir
  const outDir = packageData.out.dir

  log('Copying additional package files...')
  config.additionalFiles.forEach((filename) => {
    const src = path.resolve(sourceDir, filename)

    if (! test('-e', src)) return

    cp('-Rf', src, outDir)
  })
}
