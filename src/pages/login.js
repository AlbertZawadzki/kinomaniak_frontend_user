import React from "react"
import Layout from "../components/layout/Layout"

class Login extends React.Component {
  state = {
    loginText: "Zaloguj się",
    registerText: "Zarejestruj się",
  }


  submitLoginForm = (event) => {
    console.log(event)
  }

  submitRegisterForm = (event) => {
    console.log(event)
  }

  render() {
    const { loginText, registerText } = this.state

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
              <input id="email" type="email" name="email" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password">
                Hasło:
              </label>
              <input id="password" type="password" name="password" required />
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
              <input id="email-reg" type="email" name="email" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="name">
                Imię:
              </label>
              <input id="name" type="text" name="name" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="lastname">
                Nazwisko:
              </label>
              <input id="lastname" type="text" name="lastname" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password-reg">
                Hasło:
              </label>
              <input id="password-reg" type="password" name="password" required />
            </div>

            <div className="login-page-input-wrapper">
              <label htmlFor="password_repeat">
                Powtórz hasło:
              </label>
              <input id="password_repeat" type="password" name="password_repeat" required />
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
