import { rm } from 'shelljs'
import FileSystemUtilities from '../utils/FileSystemUtilities'

export default ({ buildLocation, name }, tracker) => {
  tracker.verbose(name, 'Cleaning compiled package...')

  if (FileSystemUtilities.pathExistsSync(buildLocation)) {
    rm('-rf', buildLocation)
    tracker.verbose(name, 'Clean!')
    tracker.completeWork(1)
  }
}
