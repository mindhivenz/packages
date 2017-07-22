import { logBr, log, logSuccess } from '../utils/CliUtils'
import PackageUtilities from '../package/PackageUtilities'
import Errors from '../package/Errors'
import AsyncTask from '../core/AsyncTask'
import PromptUtilities from '../utils/PromptUtilities'
import { QUIT, ALL } from '../core/Codes'

export default class FindPackageByNameTask extends AsyncTask {

  async execute(name) {
    logBr()
    let packages
    try {
      packages = PackageUtilities.filterPackagesByName(this.command.allPackages, name)
      this.logger.info('Building one package:', name)
      logBr()

    } catch (err) {
      this.logger.error(err)
      logBr()
      if (err.is(Errors.PackageNotFoundError)) {
        const choices = [
          { value: ALL, name: 'Build all' },
          PromptUtilities.separator(),
          ...this.command.allPackages.map((pkg, index) => ({ value: index, name: pkg.npmName })),
          PromptUtilities.separator(),
          { value: QUIT, name: 'Quit' },
        ]
        const choice = await PromptUtilities.select('Available packages', choices)
        logBr()

        switch (choice) {
          case ALL: return this.command.allPackages
          case QUIT: throw choice
          default: packages = [this.command.allPackages[choice]]
        }

      }
    }
    return packages
  }
}

