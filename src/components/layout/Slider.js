import React from "react"
import SliderSlick from "react-slick"
import Link from "next/link"

class Slider extends React.Component {
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  render() {
    const { slides } = this.props

    return (
      <div className="slider-wrapper">
        <SliderSlick {...this.settings}>
          {
            slides?.desktop?.map((slide, slideNo) => (
                <Link href={`/content/${slide.id}/${slide.url}`} key={`slider-${slide.key}-${slideNo}`}>
                  <div className="slide-wrapper" key={`${slide.key}-${slideNo}`}>
                    <img src={slide.image_url} />
                  </div>
                </Link>
              ),
            )
          }
        </SliderSlick>
      </div>
    )
  }
}

export default Slider