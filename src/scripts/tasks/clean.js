import { rm, exec } from 'shelljs'
import path from 'path'
import FileSystemUtilities from '../utils/FileSystemUtilities'

export default async ({ buildLocation, name }, logger) => {
  logger.verbose(name, 'Cleaning compiled package...')

  if (FileSystemUtilities.pathExistsSync(buildLocation)) {
    // rm('-rf', buildLocation)
    loggser.verbose(name, 'Clean!')
    logger.completeWork(1)
  }
  return true
}
