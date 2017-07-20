import path from 'path'
import { cp, test } from 'shelljs'
import { log } from './utils'

import config from './config'

export default ({ buildLocation, sourceLocation }) => {

  log('Copying additional package files...')
  config.additionalFiles.forEach((filename) => {
    const src = path.resolve(sourceLocation, filename)

    if (! test('-e', src)) return

    cp('-Rf', src, buildLocation)
  })
}
