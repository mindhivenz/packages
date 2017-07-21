
import { logBr, log, styleError } from '../utils/CliUtils'
import PromptUtilities from '../utils/PromptUtilities'

export default async (packages, versions, logger) => {
  const changes = packages.map((pkg) => {
    let line = ` - ${pkg.name}: ${pkg.version} => ${versions[pkg.npmName]}`
    if (pkg.isPrivate()) {
      line += ` (${styleError('private')})`
    }
    return line
  })

  logBr()
  log('Changes:')
  logger.info(changes.join('\n'))
  logBr()

  const confirm = await PromptUtilities.confirm('Are you sure you want to publish the above changes?')
  logBr()
  return confirm

}

