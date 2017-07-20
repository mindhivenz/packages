import path from 'path'
import { cp, test } from 'shelljs'
import { log } from './utils'

import config from './config'

export default ({ buildLocation, sourceLocation, name }, tracker) => {

  tracker.verbose(name, 'Copying additional package files...')
  // log('Copying additional package files...')
  tracker.addWork(config.additionalFiles.length)
  config.additionalFiles.forEach((filename) => {
    const src = path.resolve(sourceLocation, filename)

    if (! test('-e', src)) return

    cp('-Rf', src, buildLocation)
  })
  tracker.verbose(name, 'Copied!')
  tracker.completeWork(1)

}
