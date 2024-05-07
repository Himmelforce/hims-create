#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { cyan, yellow, green } from "kolorist"
import prompts from "prompts"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const copyDir = (srcDir, destDir) => {
  try {
    fs.mkdirSync(destDir, { recursive: true })
    const files = fs.readdirSync(srcDir)
    for (const file of files) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
  } catch (error) {
    console.error("Failed to copy directory:", error)
    process.exit(1)
  }
}

const copy = (src, dest) => {
  try {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) copyDir(src, dest)
    else fs.copyFileSync(src, dest)
  } catch (error) {
    console.error("Error copying files:", error)
    process.exit(1)
  }
}

const main = async () => {
  console.log(cyan("Welcome to HiMS!"))
  console.log("Current directory:", process.cwd())

  let result = await prompts([
    {
      type: "text",
      name: "name",
      message: "What is your project name?",
      initial: "my-project"
    }
  ])

  const { name } = result

  console.log(yellow("Creating project..."))

  const templatePath = path.resolve(__dirname, "template")
  const projectPath = path.resolve(process.cwd(), name)

  copy(templatePath, projectPath)

  console.log(green("Project created at:"), projectPath)
}

main()
