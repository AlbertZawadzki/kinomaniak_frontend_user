import React from "react"
import { connect } from "react-redux"
import { removeNotification } from "../../../redux/actions/notification"

class Notification extends React.Component {
  state = {
    counter: 3000,
    step: 10,
    countDown: true,
    status: {
      name: "unknown",
      translation: "unknown",
      button: "",
      autoClose: false,
    },
  }

  setCountDown = (countDown) => {
    this.setState({ countDown })
  }

  close = () => {
    const { id } = this.props
    this.setState({ counter: 50 })

    setTimeout(() => {
      this.props.dispatch(removeNotification(id))
    }, 250)
  }

  componentDidMount() {
    let { status } = this.props
    this.setState({
      status: {
        ...this.state.status,
        button: status,
        name: status,
      },
    })

    const { autoClose } = status
    const { step } = this.state

    if (autoClose) {
      this.timeCounter = setInterval(() => {
        let { step, counter, countDown } = this.state
        if (countDown) {
          counter -= step
          this.setState({ counter })
        }

        if (counter === 0) {
          clearInterval(this.timeCounter)
          this.close()
        }
      }, step)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeCounter)
  }

  render() {
    let { title, message } = this.props
    let { status, counter } = this.state
    const buttonClass = "notification-button"

    return (
      <div
        className={`notification ${status.name} ${
          counter < 51 ? "closing" : "open"
        }`}
        onMouseEnter={() => this.setCountDown(false)}
        onMouseLeave={() => this.setCountDown(true)}
      >
        <button className={buttonClass} onClick={() => this.close()}>
          &#10006;
        </button>
        <h3 className="notification-title no-border">
          {title}
        </h3>
        {message?.length > 0 && (
          <div className="notification-message">{message}</div>
        )}
      </div>
    )
  }
}

Notification.defaultProps = {
  status: "unknown",
  title: "No title given",
  message: "",
  id: -1,
  autoClose: false,
}

export default connect()(Notification)
