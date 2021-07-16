import React from "react"
import Link from "next/link"

class Poster extends React.Component {
  render() {
    const {
      poster,
      contentUrl,
      geo_blocked
    } = this.props

    const {
      image,
      border_color,
      border_visible,
      pin_color,
      hidden_text,
      pin_text,
    } = poster

    const stylesWrapper = {
      backgroundImage: `url(${image.web})`,
      borderColor: border_color,
      borderWidth: border_visible ? 1 : 0,
      opacity: geo_blocked ? 0.2 : 1,
    }

    const stylesTag = {
      backgroundColor: pin_color,
    }

    return (
      <Link href={contentUrl}>
        <div className="poster-wrapper" style={stylesWrapper}>
          <div className="poster-pin" style={stylesTag}>
            {pin_text}
          </div>
          <div className="hidden-text">
            {hidden_text}
          </div>
        </div>
      </Link>
    )
  }
}

export default Poster