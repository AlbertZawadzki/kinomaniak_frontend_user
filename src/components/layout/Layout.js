import React from "react"
import DesktopMenu from "./menu/DesktopMenu"
import MobileMenu from "./menu/MobileMenu"
import database from "../../database"
import { connect } from "react-redux"
import { setSections } from "../../redux/actions/section"
import { setPages } from "../../redux/actions/page"
import { setSeos } from "../../redux/actions/seo"
import store from "../../redux/store"
import Slider from "./Slider"
import Head from "next/head"
import Loader from "../Loader"
import Notifications from "./notifications"
import Dev from "./dev"

class Layout extends React.Component {
  state = {
    fetched: false,
    seo: [],
    slides: [],
  }

  async componentDidMount() {
    const data = await database.get("home")

    store.dispatch(setSections(data.sections))
    store.dispatch(setPages(data.pages))
    store.dispatch(setSeos(data.seo))

    this.setState({ fetched: true, seo: data.seo, slides: data.slider })
  }

  render() {
    const { fetched, slides, seo } = this.state
    const { children, title } = this.props

    const fitSeo = seo.filter(item => item.url.toString().toLowerCase() === window.location.pathname.toString().toLowerCase())

    if (!fetched) {
      return (
        <Loader />
      )
    }

    return (
      <React.Fragment>
        <Head>
          <title>VOD | {title || ""}</title>
        </Head>
        <Notifications />
        <DesktopMenu />
        <MobileMenu />
        <Slider slides={slides} />
        <main>
          {children}
        </main>
        <Dev />
        <footer>
          {
            fitSeo.map(item => (
                <p>
                  {item.description}
                </p>
              ),
            )
          }
        </footer>
      </React.Fragment>
    )
  }
}

export default connect()(Layout)