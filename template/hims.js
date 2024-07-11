#!/usr/bin/env node

const process = require("process")

process.on("SIGINT", () => {
  console.log("Process interrupted. Exiting...")
  process.exit(0)
})

const commands = {
  init: require("./scripts/init"),
  start: require("./scripts/start"),
  stop: require("./scripts/stop"),
  help: require("./scripts/help"),
  purge: require("./scripts/purge")
}

const close = require(`./lib/input`).close

const args = process.argv.slice(2)

const flags = {}

args.filter(arg => {
  if (arg.startsWith("-")) {
    const [flag, value] = arg.split("=")
    flags[flag.replace(/^--/, "")] = value || true
    return false
  }
  return true
})

const main = async () => {
  switch (args[0]) {
    case "init":
      await commands.init(flags)
      break
    case "start":
      await commands.start(flags)
      break
    case "stop":
      await commands.stop(flags)
      break
    case "help":
      await commands.help(flags)
      break
    case "--help":
      await commands.help(flags)
    case "-h":
      await commands.help(flags)
      break
    case "purge":
      await commands.purge(flags)
      break
    case undefined:
      console.log("No command provided!")
      break
    default:
      console.log(`Unknown command: ${args[0]}`)
      break
  }

  close()
}

main()
