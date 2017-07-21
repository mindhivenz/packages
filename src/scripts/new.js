import yargs from 'yargs'
import { handler } from './commands/NewCommand'
// import NewCommand, { handler } from './commands/NewCommand'

handler(yargs.argv)

// new NewCommand(process.argv, {}, null).run()

