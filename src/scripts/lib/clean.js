import { rm } from 'shelljs'
import { log } from './utils'
import FileSystemUtilities from '../utils/FileSystemUtilities'

export default ({ buildLocation, name }, tracker) => {
  tracker.info(name, 'Cleaning compiled package...')

  if (FileSystemUtilities.pathExistsSync(buildLocation)) {
    rm('-rf', buildLocation)
    tracker.info(name, 'Clean!')
    tracker.completeWork(1)
  }
}
