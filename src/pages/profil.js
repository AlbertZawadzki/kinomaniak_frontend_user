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
          <div className="error-box">
            <p style={{ margin: "auto" }}>
              <span style={{ marginRight: "5px" }}>Jesteś niezalogowany</span>
              <Link
                href="/login"
              >
                zaloguj się
              </Link>
            </p>
          </div>
        </Layout>
      )
    }

    return (
      <Layout title={"Profil " + user.name + " " + user.lastname}>
        <div className="profile-data-wrapper">
          <button
            type="button"
            className="login-page-submit"
            onClick={() => this.logout()}
          >
            Wyloguj się
          </button>
          <p><span>Imię:</span> {user.name}</p>
          <p><span>Nazwisko:</span>{user.lastname}</p>
        </div>
      </Layout>
    )
  }
}

export default Profil
