import AsyncTask from '../core/AsyncTask'
import PublishPackageTask from './PublishPackageTask'


export default class PublishSelectedPackagesTask extends AsyncTask {
  packages
  versions

  constructor(command, packages, versions) {
    super(command)
    this.packages = packages
    this.publish = new PublishPackageTask(command, versions)
  }

  async execute() {
    if (this.packages) {
      this.logger.addWork(this.packages.length)
      return Promise.all(this.packages.map(pkg => this.publish.execute(pkg)))
    }
    return Promise.resolve()
  }

}
