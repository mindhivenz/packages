import v from 'vorpal'

import buildCmd from './build'
import newCmd from './new'

const vorpal = v()
vorpal
  .command('build [package]', 'Builds packages')
  .action(buildCmd)

// vorpal
//   .command('new [package]', 'Creates a new package')
//   .action(newCmd)

vorpal
  .delimiter('mhp$')
  .show()
