import React from "react"
import { connect } from "react-redux"
import store from "../../../redux/store"
import Tile from "../../Tile"

class Redux extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    let { data } = this.state
    data = store.getState()
    this.setState({ data })

    this.subscriber = store.subscribe(() => {
      data = store.getState()
      this.setState({ data })
    })
  }

  componentWillUnmount() {
    this.subscriber()
  }

  render() {
    const { data } = this.state

    return (
      <Tile title={`Redux (${Object.keys(data).length})`} hidden column>
        {Object.keys(data).map((store) => (
          <Tile
            key={`store-${store}`}
            title={`${store.charAt(0).toUpperCase() + store.slice(1)} (${
              data[store].data?.length || 0
            })`}
            sub={1}
            hidden
          >
            <pre>{JSON.stringify(data[store], null, 4)}</pre>
          </Tile>
        ))}
      </Tile>
    )
  }
}

export default connect()(Redux)
