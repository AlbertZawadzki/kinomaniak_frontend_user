import React from "react"
import store from "../../../redux/store"
import { useRouter } from "next/router"
import database from "../../../database"
import Layout from "../../../components/layout/Layout"

const Content = ({ content }) => {
  return (
    <Layout title={content.title}>
      WIP
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