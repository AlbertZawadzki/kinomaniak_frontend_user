import React from "react"
import Layout from "../components/layout/Layout"
import database from "../database"
import store from "../redux/store"
import Link from "next/link"

class Profil extends React.Component {
  state = {
    user: undefined,
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
          user: store.getState().request?.data?.user,
        },
      )
    })
  }

  logout = async () => {
    await database.doLogout()
    this.forceUpdate()
  }

  render() {
    const { user } = this.state

    if (!user) {
      return (
        <Layout title={"Logowanie"}>
          Jesteś niezalogowany
          <Link
            href="/login"
          >
            zaloguj się
          </Link>
        </Layout>
      )
    }

    return (
      <Layout title={"Profil " + user.name + " " + user.lastname}>
        <pre>
        {JSON.stringify(user, null, 2)}
        </pre>
        <button
          type="button"
          className="login-page-submit"
          onClick={() => this.logout()}
        >
          Wyloguj się
        </button>
      </Layout>
    )
  }
}

export default Profil
