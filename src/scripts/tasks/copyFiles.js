import fs from 'fs-extra'
import path from 'path'

const getFiles = async (sourceLocation, files) => files

export default async ({ buildLocation, sourceLocation, name }, files, logger) => {
  logger.silly('copyFiles', files)
  logger.verbose(name, 'Copying additional package files...')

  files.forEach(async file => {
    const sourceFile = path.resolve(sourceLocation, file)
    if (await fs.pathExists(sourceFile)) {
      const destFile = path.resolve(buildLocation, file)
      fs.copy(sourceFile, destFile)
    }
  })
}
