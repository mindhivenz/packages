import asyncJs from 'async'
import promptVersion from './promptVersion'

import ProcessConfirmTask from '../core/ProcessConfirmTask'

export default class RequestNewVersionsTask extends ProcessConfirmTask {

  async execute() {
    const packages = this.initialValues.packages
    return new Promise((resolve, reject) => {
      const NUM_PARALLEL_PROCESSES = 1
      asyncJs.mapLimit(packages, NUM_PARALLEL_PROCESSES, async ({ npmName, version }, cb) => {
        cb(null, await promptVersion(npmName, version))
      }, (err, versions) => {
        if (err) {
          reject(err)
          return
        }
        packages.forEach(({ npmName }, index) => {
          versions[npmName] = versions[index]
        })

        resolve(versions)
      })

    })
  }

}
