import React from "react"
import store from "../../../redux/store"
import { useRouter } from "next/router"
import database from "../../../database"
import Layout from "../../../components/layout/Layout"
import Poster from "../../../components/layout/Poster"
import ContentSection from "../../../components/pages/ContentSection"

const Content = ({ content }) => {
  return (
    <Layout title={content.title}>
      <h1 className="content-title">{content.title}</h1>
      <main>
        <ContentSection title="Opis">
          {content.description}
        </ContentSection>
        <ContentSection title="Informacje">
          <div className="content-info-key">
            Data wydania
          </div>
          <div className="content-info-data">
            {content.release_date}
          </div>
          <div className="content-info-key">
            Dostępne wkrótce
          </div>
          <div className="content-info-data">
            {content.available_soon} {content.premiere_date}
          </div>
          <div className="content-info-key">
            Pokazuj przed premierą
          </div>
          <div className="content-info-data">
            {content.pre_premiere_availability}
          </div>
        </ContentSection>
        <ContentSection title="Dostępne w regionach">
          {content.regions.map(region => `${region.name} (${region.region}),`)}
        </ContentSection>
      </main>
      <pre>
        {JSON.stringify(content, null, 2)}
      </pre>
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