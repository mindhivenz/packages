import async from 'async'
// import path from 'path'

import Command from './Command'
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
    const tracker = this.logger.newItem('clean')
    tracker.addWork(this.directoriesToDelete.length)

    async.parallelLimit(this.directoriesToDelete.map(dirPath => (cb) => {
      tracker.info('clean', 'removing', dirPath)
      // FileSystemUtilities.rimraf(dirPath, (err) => {
      //   tracker.completeWork(1);
      //   cb(err)
      cb(null)
      // });
    }), this.concurrency, (err) => {
      tracker.finish()

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

