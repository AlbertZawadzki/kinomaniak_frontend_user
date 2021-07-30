import React from "react"
import Notification from "./Notification"
import { connect } from "react-redux"
import store from "../../../redux/store"

class Notifications extends React.Component {
  state = {
    notifications: [],
  }

  fetchFromStore = () => {
    let { notifications } = this.state
    notifications = store.getState().notifications.data
    this.setState({ notifications })
  }

  subscribeStore = () => {
    this.fetchFromStore()
    this.subscriber = store.subscribe(() => this.fetchFromStore())
  }

  componentDidMount() {
    this.subscribeStore()
  }

  componentWillUnmount() {
    this.subscriber()
  }

  render() {
    const { notifications } = this.state

    return (
      <div className="notification-wrapper">
        <div className="notification-inner-wrapper">
          {notifications.map((notification) => (
            <Notification key={notification.id} {...notification} />
          ))}
        </div>
      </div>
    )
  }
}

export default connect()(Notifications)
