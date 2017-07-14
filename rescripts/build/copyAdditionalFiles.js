const { log } = require('./utils')
const path = require('path')
const { cp, test } = require('shelljs')

exports.default = (packageData) => {
  const sourceDir = packageData.src.dir
  const outDir = packageData.out.dir

  log('Copying additional package files...')
  const additionalProjectFiles = ['README.md', '.npmignore', 'package.json']
  additionalProjectFiles.forEach((filename) => {
    const src = path.resolve(sourceDir, filename)

    if (! test('-e', src)) return

    cp('-Rf', src, outDir)
  })
}
