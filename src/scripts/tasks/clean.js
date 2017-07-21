import { rm } from 'shelljs'
import FileSystemUtilities from '../utils/FileSystemUtilities'

export default ({ buildLocation, name }, logger) => {
  logger.verbose(name, 'Cleaning compiled package...')

  if (FileSystemUtilities.pathExistsSync(buildLocation)) {
    rm('-rf', buildLocation)
    logger.verbose(name, 'Clean!')
    logger.completeWork(1)
  }
}
