import asyncJs from 'async'
// import PackageUtilities from '../package/PackageUtilities'
import promptVersion from './promptVersion'


export default async packagesToUpdate => new Promise((resolve, reject) => {
  asyncJs.mapLimit(packagesToUpdate, 1, (pkg, cb) => {
    const run = async () => await promptVersion(pkg.npmName, pkg.version)
    run().then(answer => cb(null, answer))
  }, (err, versions) => {
    if (err) {
      reject(reject)
      return
    }
    packagesToUpdate.forEach((pkg, index) => {
      versions[pkg.npmName] = versions[index]
    })

    resolve(versions)
  })

})
