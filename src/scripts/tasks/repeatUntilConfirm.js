
export default async (getData, confirmData) => new Promise(async (resolve, reject) => {
  let proceed = false
  let data
  while (! proceed) {
    data = await getData()
    proceed = await confirmData(data)
    if (proceed === 'quit') {
      reject(proceed)
      return
    }
  }
  resolve(data)
})
