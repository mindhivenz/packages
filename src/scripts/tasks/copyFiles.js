import path from 'path'
import fsUtils from '../utils/FileSystemUtilities'

export default ({ buildLocation, sourceLocation, name }, files, tracker) => {
  tracker.silly('copyFiles', files)
  tracker.verbose(name, 'Copying additional package files...')

  const filesToCopy = files
    .map(file => path.resolve(sourceLocation, file))
    .filter(file => fsUtils.pathExistsSync(file))

  tracker.addWork(filesToCopy.length)

  filesToCopy.forEach((sourceFile) => {
    tracker.verbose(name, `Copying ${sourceFile}`)
    fsUtils.copySync(sourceFile, buildLocation)
    tracker.completeWork(1)
  })

  tracker.verbose(name, 'Copied!')
  tracker.completeWork(1)

}
