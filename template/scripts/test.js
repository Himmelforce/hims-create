module.exports = () => {
  console.log("Starting the tests...")

  const execSync = require("child_process").execSync
  const colorize = require(`../lib/colorize`)

  execSync("docker exec hims-api  npm run test", { stdio: "inherit" })
  console.log("\n" + colorize("Stopped the tests..", "green") + "\n")
}
