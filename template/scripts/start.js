const execSync = require("child_process").execSync
const colorize = require(`../lib/colorize`)

module.exports = async (flags, env) => {
  let start_command = "docker-compose --env-file .env --env-file .hims.env up -d --wait traefik"

  console.log(env.get("ENVIRONMENT"))
  switch (env.get("ENVIRONMENT")) {
    case "development":
      start_command =
        "docker-compose --env-file .env --env-file .hims.env -f docker-compose.yml -f docker-compose.development.yml up -d --wait traefik"
      break
    case "production":
      start_command =
        "docker-compose --env-file .env --env-file .hims.env -f docker-compose.yml -f docker-compose.production.yml up -d --wait traefik"
      break
  }

  execSync(start_command, { stdio: "inherit" })
}
