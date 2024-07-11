import "$styles/pages/home.sass"

import Logo from "$assets/images/logo.svg?react"
import { Brain } from "@phosphor-icons/react"

const host = process.env.HOST
const port = process.env.ADMIN_SERVICE_PORT
const security_mode = process.env.SECURITY_MODE
const admin_path = process.env.ADMIN_PATH
const admin_url = `http${security_mode !== "insecure" ? "s" : ""}://${host}/${admin_path}`

export default () => {
  return (
    <main className="home-page">
      <div className="content">
        <Logo className="logo" />
        <h1 className="text-white">Good day, lovely humans!</h1>
        <h3 className="text-white">
          This is the HiMS (Himmelforce Management System)
          <br />
          Good luck with your work, stranger!
        </h3>

        <a href={admin_url} className="button">
          <h5 className="text-black">Go to Admin Panel</h5>
          <Brain className="text-black" size={20} />
        </a>
      </div>
    </main>
  )
}
