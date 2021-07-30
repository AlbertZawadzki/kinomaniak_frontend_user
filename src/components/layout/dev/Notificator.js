import React from "react"
import { connect } from "react-redux"
import { addNotification } from "../../../redux/actions/notification"
import Tile from "../../Tile"

class Notificator extends React.Component {
  state = {
    dark: false,
  }

  addNotification = (status, title, message = null) => {
    this.props.dispatch(addNotification({ status, title, message }))
  }

  render() {
    const { dark } = this.state

    return (
      <Tile title="Notfications" hidden>
        <input
          type="button"
          onClick={() =>
            this.addNotification("processing", "Process", "message")
          }
          value="Processing"
        />
        <input
          type="button"
          onClick={() => this.addNotification("success", "Success")}
          value="Success"
        />
        <input
          type="button"
          onClick={() => this.addNotification("failure", "Failure", "message")}
          value="Failure"
        />
        <input
          type="button"
          onClick={() => this.addNotification("xd", "???", "message")}
          value="Unknown"
        />
        <input
          type="button"
          onClick={() => this.addNotification("more-action", "More", "message")}
          value="More action"
        />
        <input type='button' value={`switch theme to ${dark ? "light" : "dark"}`}
               onClick={() => {
                 this.setState({ dark: !dark })
                 document.body.className = `theme-${dark ? "dark" : "light"}`
               }}
        />
      </Tile>
    )
  }
}

export default connect()(Notificator)
