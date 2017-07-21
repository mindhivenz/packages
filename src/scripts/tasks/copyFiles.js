import path from 'path'
import fsUtils from '../utils/FileSystemUtilities'

export default ({ buildLocation, sourceLocation, name }, files, logger) => {
  logger.silly('copyFiles', files)
  logger.verbose(name, 'Copying additional package files...')

  const filesToCopy = files
    .map(file => path.resolve(sourceLocation, file))
    .filter(file => fsUtils.pathExistsSync(file))

  logger.addWork(filesToCopy.length)

  filesToCopy.forEach((sourceFile) => {
    logger.verbose(name, `Copying ${sourceFile}`)
    fsUtils.copySync(sourceFile, buildLocation)
    logger.completeWork(1)
  })

  logger.verbose(name, 'Copied!')
  logger.completeWork(1)

}
