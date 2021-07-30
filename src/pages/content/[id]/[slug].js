import React from "react"
import store from "../../../redux/store"
import { useRouter } from "next/router"
import database from "../../../database"
import Layout from "../../../components/layout/Layout"
import Poster from "../../../components/layout/Poster"
import ContentSection from "../../../components/pages/ContentSection"
import ContentInfo from "../../../components/pages/ContentInfo"

const Content = ({ content }) => {
  let show = 0
  if (content.geo_blocked) {
    show = 1
  } else if (!content.available && !content.pre_premiere_availability) {
    show = 2
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps = async (query) => {
  const id = query.params.id
  const content = await database.get("content/" + id)

  return { props: { content } }
}

export default Content