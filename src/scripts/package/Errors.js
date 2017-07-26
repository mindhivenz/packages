const isFunct = me => err => err.name === me.name

const setup = (me, name, message) => {
  me.name = name
  me.message = message || ''
  me.is = isFunct(me)
  const error = new Error(me.message)
  error.name = me.name
  error.is = me.is
  me.stack = error.stack
}

function PackageNotFoundError(message) {
  setup(this, 'PackageNotFoundError', message)
}
PackageNotFoundError.prototype = Object.create(Error.prototype)

function NoPackagesLeftError(message) {
  setup(this, 'NoPackagesLeftError', message)
}
NoPackagesLeftError.prototype = Object.create(Error.prototype)

export default {
  PackageNotFoundError,
  NoPackagesLeftError,
}
