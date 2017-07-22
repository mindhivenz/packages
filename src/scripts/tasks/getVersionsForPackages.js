import asyncJs from 'async'
import promptVersion from './promptVersion'


export default async packages => new Promise((resolve, reject) => {
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
