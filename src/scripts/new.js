import yargs from 'yargs'
import { handler } from './commands/NewCommand'
// import NewCommand, { handler } from './commands/NewCommand'
const argv = yargs.argv._
const params = {
  options: {},
}
if (argv) {
  params.package = argv[0]
}
export default handler

console.log(params)
handler(params, () => {})

// new NewCommand(process.argv, {}, null).run()

