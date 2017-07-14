import init from 'init-package-json'
import path from 'path'
import fs from 'fs'
import ncp from 'ncp'
import exit from 'shelljs'


const newPackageName = `${process.argv[2]}`
process.newPackageName = newPackageName

const baseDirectory = path.resolve(__dirname, '../')
const packagesDirectory = path.resolve(baseDirectory, 'src/packages')
const initDirectory = path.resolve(baseDirectory, 'init')
const initFile = path.resolve(initDirectory, 'npm-init-defaults.js')
const defaultPackageDir = path.resolve(initDirectory, 'default-package')
const newPackageDir = path.resolve(packagesDirectory, newPackageName)

if (fs.existsSync(newPackageDir)) {
  console.warn(`Package directory already exists: ${newPackageDir}`)
  exit(0)
}

try {
  ncp(defaultPackageDir, newPackageDir)
  init(newPackageDir, initFile, { '__pn': newPackageName }, () => {})
}
catch (err) {
  console.log(err)
}

