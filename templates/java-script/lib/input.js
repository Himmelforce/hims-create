const readLine = require("readline")

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

const input = query => {
  return new Promise(resolve =>
    rl.question(query, answer => {
      resolve(answer)
    })
  )
}

module.exports = { input, close: rl.close.bind(rl) }
