const execSync = require("child_process").execSync
const colorize = require(`../lib/colorize`)

module.exports = async flags => {
  console.log("\n" + colorize("Purging containers...", "green") + "\n")
  execSync("docker-compose --env-file .env --env-file .hims.env down", { stdio: "inherit" })
  console.log("\n" + colorize("Containers purged!", "green") + "\n")
}
