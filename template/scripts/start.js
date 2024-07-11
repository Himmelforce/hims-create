const execSync = require("child_process").execSync
const colorize = require(`../lib/colorize`)

module.exports = async flags => {
  try {
    execSync("docker-compose --env-file .env --env-file .hims.env up -d", { stdio: "inherit" })
    console.log("\n" + colorize("Welcome to the HiMS development version setup!", "green") + "\n")
  } catch (error) {
    console.error(colorize(error, "red"))
  }
}
