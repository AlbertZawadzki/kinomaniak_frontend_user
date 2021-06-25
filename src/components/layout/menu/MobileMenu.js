import React, { useState } from "react"
import store from "../../../redux/store"
import Link from "next/link"

const MobileMenu = () => {
  const pages = store.getState()?.pages?.data || []
  const [show, switchMenu] = useState(false)

  return (
    <nav className={`max-mobile ${show ? "show" : "hide"}`}>
      <div className={`menu-lines-wrapper ${show ? "show" : "hide"}`} onClick={() => switchMenu(!show)}>
        <div className='menu-line-1' />
        <div className='menu-line-2' />
        <div className='menu-line-3' />
      </div>
      <div className='menu-item-wrapper'>
        <Link href='/'>
          <div className='menu-item'>
            Główna
          </div>
        </Link>
      </div>
      <div className='menu-item-wrapper'>
        <Link href='/contact'>
          <div className='menu-item'>
            Kontakt
          </div>
        </Link>
      </div>
      {pages.length > 0 && (
        <div className='menu-item-wrapper'>
          <div className='menu-item'>
            Inne
          </div>
          <div className='menu-item-sub-wrapper'>
            {pages.map(page => (
              <Link key={page.key} href={`pages/${page.url}`}>
                <div className='menu-item-sub'>
                  {page.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className='menu-item-wrapper'>
        <Link href='/login'>
          <div className='menu-item'>
            Logowanie
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default MobileMenu