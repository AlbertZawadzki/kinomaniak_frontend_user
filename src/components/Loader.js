import React from "react"

class Loader extends React.Component {
  state = {
    timer: 0,
    interval: 100,
  }

  componentDidMount() {
    let { timer, interval } = this.state

    this.counter = setInterval(() => {
      timer += interval
      this.setState({ timer })
    }, interval)
  }

  componentWillUnmount() {
    clearInterval(this.counter)
  }

  render() {
    const { timer } = this.state

    const parsedTime = parseInt(timer / 1000) === (timer / 1000) ? `${timer / 1000}.0` : (timer / 1000)

    return (
      <div className='loader-wrapper'>
        <div className='loader-bar outer'>
          <div className='loader-bar inner' />
        </div>
        <div className='loader-time'>
          {parsedTime}
        </div>
      </div>
    )
  }
}

export default Loader