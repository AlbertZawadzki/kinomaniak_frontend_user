import React from "react"
import store from "../../../redux/store"
import Link from "next/link"

const DesktopMenu = () => {
  const pages = store.getState()?.pages?.data || []

  const changeTheme = () => {
    const actualTheme = localStorage.getItem("theme") || "theme-light"
    if (actualTheme === "theme-light") {
      localStorage.setItem("theme", "theme-dark")
      document.body.className = "theme-dark"
    } else {
      localStorage.setItem("theme", "theme-light")
      document.body.className = "theme-light"
    }
  }

  return (
    <nav className="min-tablet">
      <div className="menu-item-wrapper">
        <Link href="/">
          <div className="menu-item">
            Główna
          </div>
        </Link>
      </div>
      <div className="menu-item-wrapper">
        <Link href="/contact">
          <div className="menu-item">
            Kontakt
          </div>
        </Link>
      </div>
      {
        pages.length > 0 && (
          <div className="menu-item-wrapper">
            <div className="menu-item">
              Inne
            </div>
            <div className="menu-item-sub-wrapper">
              {pages.map(page => (
                <Link key={page.key} href={`pages/${page.url}`}>
                  <div className="menu-item-sub">
                    {page.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      <div className="menu-item-wrapper">
        <Link href="/login">
          <div className="menu-item">
            Logowanie
          </div>
        </Link>
      </div>
      <div className="menu-item-wrapper" onClick={() => changeTheme()}>
        <div className="menu-item">
          Motyw
        </div>
      </div>
    </nav>
  )
}

export default DesktopMenu