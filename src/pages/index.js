import React from "react"
import Layout from "../components/layout/Layout"
import { connect } from "react-redux"
import store from "../redux/store"
import Section from "../components/layout/Section"

class Home extends React.Component {
  state = {
    sections: [],
  }

  componentDidMount() {
    this.getSections()

    store.subscribe(() => this.getSections())
  }

  getSections = () => {
    const sections = store.getState()?.sections?.data || []
    this.setState({ sections })
  }

  render() {
    const { sections } = this.state

    return (
      <Layout>
        {sections?.map(section => <Section {...section} />)}
      </Layout>
    )
  }
}

export default connect()(Home)
