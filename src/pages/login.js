import React from "react"
import Layout from "../components/layout/Layout"
import database from "../database"
import store from "../redux/store"

class Login extends React.Component {
  state = {
    loginText: "Zaloguj się",
    registerText: "Zarejestruj się",
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

  submitLoginForm = async (event) => {
    event.preventDefault()
    const email = event.target[0]?.value || ""
    const password = event.target[1]?.value || ""

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    await database.doLogin(formData)
  }

  submitRegisterForm = async (event) => {
    event.preventDefault()
    const email = event.target[0]?.value || ""
    const name = event.target[1]?.value || ""
    const lastname = event.target[2]?.value || ""
    const password = event.target[3]?.value || ""
    const passwordRepeat = event.target[4]?.value || ""
    const sub = event.target[5]?.checked
    const rules = event.target[6]?.checked

    const formData = new FormData()
    formData.append("email", email)
    formData.append("name", name)
    formData.append("lastname", lastname)
    formData.append("password", password)
    formData.append("passwordRepeat", passwordRepeat)
    formData.append("sub", sub)
    formData.append("rules", rules)

    await database.post("register", (data) => {
    }, formData)
  }

  logout = async () => {
    await database.doLogout()
    this.forceUpdate()
  }

  render() {
    const { loginText, registerText, user } = this.state

    if (user && user.id) {
      return (
        <Layout title={"Logowanie"}>
          <div className="error-box">
            <div style={{ margin: "auto" }}>
              <span style={{ marginRight: "15px" }}>Jesteś już zalogowany</span>
              <button
                type="button"
                className="login-page-submit"
                onClick={() => this.logout()}
              >
                wyloguj się
              </button>
            </div>
          </div>
        </Layout>
      )
    }

    return (
      <Layout title={"Logowanie"}>
        <div className="login-page-wrapper">
          <form className="login-page-form-wrapper" onSubmit={(event) => this.submitLoginForm(event)}>
            <h3>
              Logowanie
            </h3>
            <div className="login-page-input-wrapper">
              <label htmlFor="email">
                Email:
              </label>
              <input autoComplete="off" id="email" type="email" name="email" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password">
                Hasło:
              </label>
              <input autoComplete="off" id="password" type="password" name="password" required />
            </div>

            <input type="submit" className="login-page-submit" value={loginText} />
          </form>

          <form className="login-page-form-wrapper" onSubmit={(event) => this.submitRegisterForm(event)}>
            <h3>
              Rejestracja
            </h3>
            <div className="login-page-input-wrapper">
              <label htmlFor="email-reg">
                Email:
              </label>
              <input autoComplete="off" id="email-reg" type="email" name="email" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="name">
                Imię:
              </label>
              <input autoComplete="off" id="name" type="text" name="name" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="lastname">
                Nazwisko:
              </label>
              <input autoComplete="off" id="lastname" type="text" name="lastname" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password-reg">
                Hasło:
              </label>
              <input autoComplete="off" id="password-reg" type="password" name="password" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password_repeat">
                Powtórz hasło:
              </label>
              <input autoComplete="off" id="password_repeat" type="password" name="password_repeat" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="subscription">
                Subskrybcja:
              </label>
              <input id="subscription" type="checkbox" name="subscription" />

            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="rules">
                Akceptuję regulamin:
              </label>
              <input id="rules" type="checkbox" name="rules" required />
            </div>

            <input type="submit" className="login-page-submit" value={registerText} />
          </form>
        </div>
      </Layout>
    )
  }
}

export default Login
