import { rm } from 'shelljs'
import { log } from './utils'
import FileSystemUtilities from '../utils/FileSystemUtilities'

export default ({ buildLocation }) => {
  if (FileSystemUtilities.pathExistsSync(buildLocation)) {
    log('Deleting compiled package...')
    rm('-rf', buildLocation)
  }
}
