module.exports = () => {
  console.log("Stopping the HiMS development version setup...")

  const execSync = require("child_process").execSync
  const colorize = require(`../lib/colorize`)

  execSync("docker-compose --env-file .env --env-file .hims.env down", { stdio: "inherit" })
  console.log("\n" + colorize("HiMS development version setup stopped!", "green") + "\n")
}
