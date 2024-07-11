const colorize = require("../lib/colorize")

module.exports = async flags => {
  console.log("\n" + colorize("Help for the HiMS development version setup!", "green") + "\n")

  console.log("Commands:" + "\n")

  console.log(colorize("init", "blue") + " - Initialize the HiMS development version setup")

  console.log("\n")

  console.log(colorize("start", "blue") + " - Start the HiMS development version setup")
  console.log(colorize("stop", "blue") + " - Stop the HiMS development version setup")

  console.log(colorize("purge", "blue") + " - Purge containers")

  console.log("\n")

  console.log(colorize("help", "blue") + " - Show this help message")

  console.log("\n")
}
