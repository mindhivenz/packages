import { rm } from 'shelljs'
import { log } from './utils'

export default (mhPackage) => {
  if (mhPackage.out.exists) {
    log('Deleting compiled package...')
    rm('-rf', mhPackage.out.dir)
  }
}
