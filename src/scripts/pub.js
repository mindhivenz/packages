import yargs from 'yargs'
import { handler } from './commands/PublishCommand'

handler(yargs.argv)

