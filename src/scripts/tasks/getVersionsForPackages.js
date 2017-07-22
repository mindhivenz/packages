import asyncJs from 'async'
// import PackageUtilities from '../package/PackageUtilities'
import promptVersion from './promptVersion'


export default async packagesToUpdate => new Promise((resolve, reject) => {
  asyncJs.mapLimit(packagesToUpdate, 1, async (pkg, cb) => {
    cb(null, await promptVersion(pkg.npmName, pkg.version))
  }, (err, versions) => {
    if (err) {
      reject(err)
      return
    }
    packagesToUpdate.forEach((pkg, index) => {
      versions[pkg.npmName] = versions[index]
    })

    resolve(versions)
  })

})
