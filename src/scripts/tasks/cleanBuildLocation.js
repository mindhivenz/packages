import fs from 'fs-extra'

export default async ({ buildLocation, name }, logger) => {
  logger.verbose(name, 'Cleaning compiled package...')
  await fs.emptyDir(buildLocation)
  logger.verbose(name, 'Clean!')
  logger.completeWork(1)
  return true
}
