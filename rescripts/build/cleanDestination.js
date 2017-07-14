const { rm } = require('shelljs')
const { log } = require('./utils')

exports.default = (mhPackage) => {
  if (mhPackage.out.exists) {
    log('Deleting compiled package...')
    rm('-rf', mhPackage.out.dir)
  }
}
