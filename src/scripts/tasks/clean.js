import fs from 'fs-extra'

export default async ({ buildLocation, name }, logger) => {
  logger.verbose(name, 'Cleaning compiled package...')
  if (await fs.pathExists(buildLocation) && await fs.remove(buildLocation)) {
    logger.info(name, 'Clean!')
    logger.completeWork(1)
  }
  return true
}
