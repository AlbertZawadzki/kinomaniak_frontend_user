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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          center: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  render() {
    const { name, contents, key } = this.props

    return (
      <div className="section-wrapper">
        <h3>
          {name}
        </h3>
        <div className="posters-wrapper">
          <SliderSlick {...this.settings}>
            {
              contents?.map((content, posterNo) => (
                  <Link href={`/content/${content.url}`} key={`${key}-${content.key}-${posterNo}`}>
                    <Poster {...content} contentUrl={`/content/${content.id}/${content.url}`} />
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