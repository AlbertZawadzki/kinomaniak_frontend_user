import React from "react"
import store from "../redux/store"
import { Provider } from "react-redux"

import "../assets/styles/index.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class MyApp extends React.Component {
  componentDidMount() {
    document.body.className = localStorage.getItem("theme") || "theme-light"
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp