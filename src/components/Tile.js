import React, { useState } from "react"

const Tile = ({ hidden, hideable, title, children, sub, full, column, noShadow }) => {

  const [show, setShow] = useState(!hidden)
  let buttonStyles = { top: 0, right: 0 }
  let iconStyles = {
    transform: show ? "rotateZ(0)" : "rotateZ(-180deg)",
    transition: "transform 0.25s ease-in-out",
    fontSize: "26px",
  }

  switch (sub) {
    case 1:
      title = <h3 className="tile-title">{title}</h3>
      iconStyles.fontSize = "22px"
      break
    case 2:
      title = <h4 className="tile-title">{title}</h4>
      iconStyles.fontSize = "20px"
      break
    default:
      title = <h2 className="tile-title">{title}</h2>
      buttonStyles = { top: "2px", right: "2px" }
      iconStyles.fontSize = "26px"
  }

  return (
    <div className={`tile-wrapper ${full ? "full" : "small"} ${noShadow ? "no-shadow" : "shadow"}`}>
      {title}
      {hideable && (
        <button
          type="button"
          className="button absolute right top"
          onClick={() => setShow(!show)}
          style={buttonStyles}
        >
          UP
        </button>
      )}
      <div
        className={`tile-content
         ${show ? "show" : "hidden"}
          ${column ? "column" : "row"}
          `}
      >
        {children}
      </div>
    </div>
  )
}

Tile.defaultProps = {
  hidden: false,
  hideable: true,
  title: "No title given",
  children: <div className="error">No children given</div>,
  sub: 0,
  full: true,
  column: false,
  noShadow: false,
}

export default Tile
