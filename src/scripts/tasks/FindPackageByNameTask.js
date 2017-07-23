import { logBr, log, styleWhiteBold } from '../utils/CliUtils'
import PackageUtilities from '../package/PackageUtilities'
import Errors from '../package/Errors'
import AsyncTask from '../core/AsyncTask'
import PromptUtilities from '../utils/PromptUtilities'
import { QUIT, ALL } from '../core/Codes'

export default class FindPackageByNameTask extends AsyncTask {

  async execute(name) {
    logBr()
    let packages
    const filteredPackages = this.command.filteredPackages
    try {
      packages = PackageUtilities.filterPackagesByName(filteredPackages, name)
      this.logger.info('Building one package:', name)
      logBr()

    } catch (err) {
      if (err.is(Errors.PackageNotFoundError)) {
        this.logger.info(styleWhiteBold(`No packages found that match '${name}'`))
        logBr()
        const choices = [
          { value: ALL, name: 'Build all' },
          PromptUtilities.separator(),
          ...filteredPackages.map((pkg, index) => ({ value: index, name: pkg.npmName })),
          PromptUtilities.separator(),
          { value: QUIT, name: 'Quit' },
        ]
        const choice = await PromptUtilities.select('Select a package to build:', choices)

        switch (choice) {
          case ALL: return filteredPackages
          case QUIT: throw choice
          default: packages = [filteredPackages[choice]]
        }

      }
    }
    return packages
  }
}

