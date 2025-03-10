#!/usr/bin/env node

import { Command } from "commander"
import fs, { readFileSync } from "fs"
import path from "path"
import { cyan, yellow, green } from "kolorist"
import prompts from "prompts"
import { fileURLToPath } from "url"
import cli_progress from "cli-progress"
import { execSync } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const package_json = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"))
const version = package_json.version
const program = new Command()

const count_files = src_dir => {
  let count = 0
  const items = fs.readdirSync(src_dir)
  for (const item of items) {
    const full_path = path.join(src_dir, item)
    const stat = fs.statSync(full_path)
    if (stat.isDirectory()) {
      count += count_files(full_path)
    } else {
      count++
    }
  }
  return count
}

const copy = (src, dest, progress_bar) => {
  try {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true })
      const files = fs.readdirSync(src)
      for (const file of files) {
        const src_file = path.resolve(src, file)
        const dest_file = path.resolve(dest, file)
        copy(src_file, dest_file, progress_bar)
      }
    } else {
      fs.copyFileSync(src, dest)
      progress_bar.increment()
    }
  } catch (error) {
    console.error("Oops, error while copying files:", error)
    process.exit(1)
  }
}

program.name("hims").description("Himmelforce Management System CLI tool").version(version)

program
  .command("init")
  .description("Initialize a new project")
  .option("-d, --default", "Use default configuration")
  .action(async options => {
    console.clear()

    console.log(cyan("Welcome to HiMS!"))
    console.log(cyan("Your current directory is:"), process.cwd())

    let project_name
    if (options.default) {
      project_name = "my-project"
      console.log(yellow("Project name by default:"), project_name)
    } else {
      const response = await prompts({
        type: "text",
        name: "name",
        message: "Choose your project name:",
        initial: "my-project"
      })
      project_name = response.name
    }

    const template_response = await prompts({
      type: "select",
      name: "template",
      message: "Select a template:",
      choices: [
        { title: "JavaScript", value: "java-script" },
        { title: "TypeScript", value: "type-script" }
      ],
      initial: 0
    })

    const hims_cli_install_response = await prompts({
      type: "confirm",
      name: "install",
      message: "Do you want to install hims-cli in your project?",
      initial: false
    })

    console.log(yellow("Creating project..."))

    const template_path = path.resolve(__dirname, "templates", template_response.template)
    const project_path = path.resolve(process.cwd(), project_name)

    const total_files = count_files(template_path)
    const progress_bar = new cli_progress.SingleBar({}, cli_progress.Presets.rect)
    progress_bar.start(total_files, 0)

    copy(template_path, project_path, progress_bar)

    progress_bar.stop()
    console.log(green("Project was created in:"), project_path)

    if (hims_cli_install_response.install) {
      console.log(yellow("Installing hims-cli..."))
      try {
        execSync("npm install -g hims", { stdio: "inherit" })
        console.log("hims-cli was installed globally successfully.")
      } catch (error) {
        console.error("Error installing hims-cli globally.")
        if (error.message && error.message.includes("EACCES")) {
          console.error("Insufficient permissions to install global packages.")
          console.error(
            "Try running the command with elevated privileges (e.g., using sudo on Linux/macOS) or configure npm to install global packages in a user directory."
          )
        } else {
          console.error("Error details:", error)
        }
      }
    }

    console.log(yellow(`To switch to the project directory, run: cd ${project_path}`))
  })

program.parse(process.argv)
