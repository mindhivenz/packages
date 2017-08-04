import path from 'path'
import jsonfile from 'jsonfile'
import config from '../commands/config'

import { exec as execJs } from 'shelljs'
import AsyncTask from '../core/AsyncTask'


export default class PublishPackagesTask extends AsyncTask {

  writePackageVersion = (location, version) => {
    const jsonPath = path.resolve(location, 'package.json')
    const jsonData = jsonfile.readFileSync(jsonPath)
    jsonfile.writeFileSync(jsonPath, Object.assign({}, jsonData, {version}), {spaces: 2})
  }

  getExecOpts = (directory) => ({
    cwd: directory,
    env: Object.assign({}, process.env, {
      npm_config_registry: config.registry,
    }),
    silent: true,
  })

  async execute({ updating }, versions) {
    if (updating) {
      updating.forEach(pkg => {
        const { buildLocation, sourceLocation, npmName } = pkg
        this.logger.verbose(npmName, 'Publish ......')
        const newVersion = versions[npmName]
        this.writePackageVersion(buildLocation, newVersion)

        const bCommand = `cd ${buildLocation} && npm  publish`
        execJs(bCommand, this.getExecOpts(buildLocation), code => {
          if (code !== 0) throw new Error('Publish to NPM failed')
          this.writePackageVersion(sourceLocation, newVersion)
          this.logger.info(
            'Published to NPM:',
            `${npmName}@${newVersion}`
          )
        })
      })
    }
  }

}
