import path from 'path'
import jsonfile from 'jsonfile'
import config from '../commands/config'

import { exec } from 'shelljs'
import AsyncTask from '../core/AsyncTask'


export default class PublishPackageTask extends AsyncTask {
  versions

  constructor(command, versions) {
    super(command)
    this.versions = versions
  }

  writeVersionToPackageJson = (location, version) => {
    const jsonPath = path.resolve(location, 'package.json')
    const jsonData = jsonfile.readFileSync(jsonPath)
    jsonfile.writeFileSync(jsonPath, Object.assign({}, jsonData, {version}), {spaces: 2})
  }

  getExecOpts = (directory) => ({
    cwd: directory,
    env: Object.assign({}, process.env, {
      npm_config_registry: config.registry,
      '--access':  'public',
    }),
    silent: false,
  })

  execute(pkg) {
    return new Promise((resolve, reject) => {
      const { buildLocation, sourceLocation, npmName } = pkg
      const newVersion = this.versions[npmName]
      const execOpts = this.getExecOpts(buildLocation)

      this.logger.verbose(npmName, 'Publish ......')
      this.writeVersionToPackageJson(buildLocation, newVersion)
      const npmCommand = `cd ${buildLocation} && npm  publish`
      exec(npmCommand, execOpts, code => {
        if (code !== 0) {
          reject('Publish to NPM failed')
        } else {
          this.writeVersionToPackageJson(sourceLocation, newVersion)
          this.logger.info(
            '+',
            `${npmName}@${newVersion}`
          )
          this.logger.completeWork(1)
          resolve()
        }
      })
    })
  }
}
