const crypto = require("crypto")
const fs = require("fs")

const colorize = require(`../lib/colorize`)
const input = require(`../lib/input`).input

module.exports = async flags => {
  console.log("\n" + colorize("Welcome to the HiMS development version setup!", "green") + "\n")

  const config = await init_process(flags)

  const result = await write_config(config)

  if (result) console.log("\n" + colorize("Happy coding!", "green") + "\n")
}

const init_process = async flags => {
  const config = {}
  switch (flags.default) {
    case true:
      console.log(colorize("Using default configuration...", "yellow"))

      config.project_name = "HiMS"
      config.project_description = "HiMS is a simple CMS for managing your content!"

      config.enviroment = "dev"

      config.admin_init_user = "admin"
      config.admin_init_password = "admin"

      config.admin_path = "admin"
      config.translator_auth_key = "6633e0c4-beea-4940-b828-a74b45f07d94:fx"

      config.secret_key_user = crypto.randomBytes(32).toString("hex")
      config.secret_key_admin = crypto.randomBytes(32).toString("hex")

      config.mongo_username = `hims-${crypto.randomBytes(6).toString("hex")}`
      config.mongo_password = crypto.randomBytes(32).toString("hex")
      config.mongo_database = "HiMS"

      config.redis_password = crypto.randomBytes(32).toString("hex")

      config.security_mode = "insecure"
      config.host = "localhost"

      break
    default:
      config.project_name = (await input(colorize("Enter project name: ", "blue"))).trim().replace(/\s+/g, "-")
      config.project_description = await input(colorize("Enter project description: ", "cyan"))
      break
  }

  return config
}

const write_config = async config => {
  if (fs.existsSync(`.hims.env`)) {
    console.log(colorize("Configuration file already exists!", "red"))
    console.log(colorize("Do you want to overwrite the configuration?", "yellow"))

    const overwrite = await input(colorize("Yes or no: ", "blue"))

    if (overwrite === "Yes" || overwrite === "yes" || overwrite === "Y" || overwrite === "y") {
      console.log(colorize("Overwriting configuration...", "yellow"))
    } else {
      console.log(colorize("Exiting...", "red"))
      return
    }
  }

  console.log("\n" + colorize("Project setup complete!", "green") + "\n")
  console.log(colorize("Your configuration:", "yellow") + "\n")

  Object.entries(config).forEach(([key, value]) => {
    console.log(`  ${colorize(key, "cyan")}: ${colorize(value, "magenta")}`)
  })

  console.log("\n" + colorize("Writing configuration to hims.config.yml...", "yellow"))

  fs.writeFileSync(
    `.hims.env`,
    Object.entries(config)
      .map(([key, value]) => `${key.toUpperCase()}=${value}`)
      .join("\n")
  )

  return true
}
