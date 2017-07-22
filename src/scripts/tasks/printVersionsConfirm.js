import { logBr, log, logSuccess, styleWhiteBold, styleError, styleDisabled } from '../utils/CliUtils'

export default (packages, versions, logger) => {
  const skipped = []
  logSuccess('Changes:')
  packages.forEach((pkg) => {
    const { npmName, version } = pkg
    const newVersion = versions[npmName]
    if (newVersion === 'SKIP') {
      skipped.push(pkg)
    } else {
      logger.info(
        `${npmName}:`,
        `${version} => ${styleWhiteBold(newVersion)} ${pkg.isPrivate() ? styleError('private') : ''}`
      )
    }
  })
  if (skipped.length) {
    logBr()
    log('Skipping:')
    skipped.forEach((pkg) => {
      logger.info(styleDisabled(pkg.npmName))
    })
  }
}

