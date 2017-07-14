const fs = require('fs')
const path = require('path')

exports.PACKAGES_SRC_DIR = './src/packages'
exports.PACKAGES_OUT_DIR = './lib/packages'

let names

const packageNames = (DIR) => {
  console.log(DIR)
  if (! names) {
    names = fs
      .readdirSync(DIR)
      .filter(file =>
        fs.statSync(path.resolve(DIR, file)).isDirectory()
      )
  }
  return names
}
exports.getPackageNames = () => packageNames(exports.PACKAGES_SRC_DIR)

exports.getBuiltPackageNames = () => packageNames(exports.PACKAGES_OUT_DIR)
