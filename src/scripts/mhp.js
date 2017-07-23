import v from 'vorpal'

import build from './build'

const vorpal = v()
vorpal
  .command('build [package]', 'Builds packages')
  .action(build)

vorpal
  .delimiter('myapp$')
  .show()
