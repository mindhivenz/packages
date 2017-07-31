import fs from 'fs-extra'
import path from 'path'

export default async ({ buildLocation, sourceLocation, name }, files, logger) => {
  logger.silly('copyFiles', files)
  logger.verbose(name, 'Copying additional package files...')

  const filesToCopy = files
    .map(file => path.resolve(sourceLocation, file))
    .filter(async file => {
      const exists = await fs.pathExists(file)
      console.log(exists, file)
    })

  logger.addWork(filesToCopy.length)

  Promise.all(filesToCopy.map(async (sourceFile) => {
    logger.verbose(name, `Copying ${sourceFile}`)
    await fs.copy(sourceFile, buildLocation)
    logger.completeWork(1)
  }))

  logger.verbose(name, 'Copied!')
  logger.completeWork(1)

}
