import Image from "next/image"
import s from "./page.module.css"
import HiMSxNEXTjs from "./HiMSxNEXT.js.svg"
import File from "./file.svg"
import Rocket from "./rocket.svg"
import Link from "next/link"
const WellcomePage = () => {
  return (
    <main className={s.main}>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={s.image_wrapper}>
            <Image src={HiMSxNEXTjs} fill sizes="256px" alt="HiMS x Next.js Logo" />
          </div>
          <p>
            {" "}
            This is the HIMS (Himmelforce Management System) <br /> Good luck with your work, stranger!
          </p>
        </div>
        <div className={s.actions}>
          <Link href="https://hims-docs.himmelforce.com/">
            <button className={`${s.button} ${s.outlined}`}>
              <p>Read documentation</p>
              <Image src={File} width={24} height={24} alt="Documentation Icon" />
            </button>
          </Link>
          <Link href="/admin">
          <button className={`${s.button} ${s.fill}`}>
            <p>Go to Admin Panel</p>
            <Image src={Rocket} width={24} height={24} alt="Rocket Icon" />
          </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default WellcomePage
