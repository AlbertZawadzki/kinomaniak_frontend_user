import React from "react"
import database from "../../../database"
import Layout from "../../../components/layout/Layout"
import ContentInfo from "../../../components/pages/ContentInfo"
import { withRouter } from "next/router"

class Content extends React.Component {
  state = {
    content: false,
  }

  fetchContent = async () => {
  }

  componentDidMount() {
    this.fetchContent()

    const interval = setInterval(async () => {
      const router = this.props.router
      const { id } = router.query
      console.log("Exe", id, this.state.content)

      if (id !== undefined) {
        const content = await database.get("content/" + id)
        this.setState({ content })

        if (content !== undefined) {
          clearInterval(interval)
        }
      }
    }, 1500)
  }

  render() {
    const { content } = this.state
    let show = 0

    if (content?.geo_blocked) {
      show = 1
    } else if (content && !content.available && !content.pre_premiere_availability) {
      show = 2
    }

    if (!content) {
      return (
        <Layout title={"Ladowanie"}>
          <main>
            Sprawdzanie dostępności zawartości w twoim regionie
          </main>
        </Layout>
      )
    }

    return (
      <Layout title={content.title}>
        <h1 className="content-title">{content.title}</h1>
        {show !== 0 ? null : (
          <ContentInfo content={content} />
        )}
        {show !== 1 ? null : (
          <main>
            Ta zawartość jest niedostępna w twoim regionie
          </main>
        )}
        {show !== 2 ? null : (
          <main>
            Ta zawartość zostanie udostępniona {content.premiere_date}
          </main>
        )}
      </Layout>
    )
  }
}

export default withRouter(Content)