import yargs from 'yargs'
import { handler } from './commands/BuildCommand'

const argv = yargs.argv._
const params = {
  options: {},
}
if (argv) {
  params.package = argv[0]
}
export default async function (args, callback) {
  await handler(args, callback())
}

handler(params, () => {})
