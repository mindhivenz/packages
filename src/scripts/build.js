import yargs from 'yargs'
import { handler } from './commands/BuildCommand'

handler(yargs.argv)

