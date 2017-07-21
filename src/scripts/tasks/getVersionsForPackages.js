import asyncJs from 'async'
// import PackageUtilities from '../package/PackageUtilities'
import promptVersion from './promptVersion'


export default (packagesToUpdate, callback) => {
  asyncJs.mapLimit(packagesToUpdate, 1, (update, cb) => {
    const run = async () => await promptVersion(update.npmName, update.version)
    run().then(answer => cb(null, answer))
  }, (err, versions) => {
    if (err) {
      callback(null)
    }

    packagesToUpdate.forEach((update, index) => {
      // console.log('++++++++++++++++++++++++')
      // console.log(update.npmName, index)
      // console.log(versions[index])
      // console.log(versions[update.npmName])
      versions[update.npmName] = versions[index]
      // console.log(versions[update.npmName])
      // console.log('=======================')
    })

    callback(versions)
  })

}
