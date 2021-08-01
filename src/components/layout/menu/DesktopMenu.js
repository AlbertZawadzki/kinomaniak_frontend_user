import React, { useState } from "react"
import store from "../../../redux/store"
import Link from "next/link"
import { connect } from "react-redux"

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

  const [user, setUser] = useState(store.getState().request?.data?.user?.id ? store.getState().request?.data?.user : false)

  store.subscribe(() => {
    if (store.getState().request?.data?.user?.id > 0) {
      setUser(store.getState().request?.data?.user);
      return;
    }

    setUser(false)
  })

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
        {!user ? (
          <Link href="/login">
            <div className="menu-item">
              Logowanie
            </div>
          </Link>
        ) : (
          <Link href="/profil">
            <div className="menu-item">
              {user.name} {user.lastname}
            </div>
          </Link>
        )}
      </div>
      <div className="menu-item-wrapper" onClick={() => changeTheme()}>
        <div className="menu-item">
          Motyw
        </div>
      </div>
    </nav>
  )
}

export default connect()(DesktopMenu)