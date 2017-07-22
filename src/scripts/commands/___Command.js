import async from 'async'
// import path from 'path'

import Command from '../core/Command'
// import FileSystemUtilities from '../utils/FileSystemUtilities'
// import PromptUtilities from '../utils/PromptUtilities'

export const command = 'build'

export const describe = 'Remove the trans-piled code from all packages.'

export const builder = {
  'yes': {
    group: 'Command Options:',
    describe: 'Skip all confirmation prompts',
  },
}

export default class BuildCommand extends Command {
  get requiresGit() {
    return false
  }

  initialize(callback) {
    this.directoriesToDelete = this.filteredPackages.map(pkg => pkg.nodeModulesLocation)
    const continueCommand = false
    callback(null, continueCommand)

  }

  execute(callback) {
    const logger = this.logger.newItem('clean')
    logger.addWork(this.directoriesToDelete.length)

    async.parallelLimit(this.directoriesToDelete.map(dirPath => (cb) => {
      logger.info('clean', 'removing', dirPath)
      // FileSystemUtilities.rimraf(dirPath, (err) => {
      //   logger.completeWork(1);
      //   cb(err)
      cb(null)
      // });
    }), this.concurrency, (err) => {
      logger.finish()

      if (err) {
        callback(err)
      } else {
        this.logger.success('clean', 'finished')
        callback(null, true)
      }
    })
  }
}

export function handler(argv) {
  return new BuildCommand(argv._, argv).run()
}

