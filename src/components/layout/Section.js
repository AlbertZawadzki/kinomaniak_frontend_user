import React from "react"
import SliderSlick from "react-slick"
import Link from "next/link"
import Poster from "./Poster"

class Section extends React.Component {
  settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  }

  render() {
    const { name, contents, key } = this.props

    return (
      <div className='section-wrapper'>
        <h3>
          {name}
        </h3>
        <div className='posters-wrapper'>
          <SliderSlick {...this.settings}>
            {
              contents?.map((content, posterNo) => (
                  <Link href={`/content/${content.url}`} key={`${key}-${content.key}-${posterNo}`}>
                    <Poster {...content} contentUrl={`/content/${content.url}`} />
                  </Link>
                ),
              )
            }
          </SliderSlick>
        </div>
      </div>
    )
  }
}

export default Section