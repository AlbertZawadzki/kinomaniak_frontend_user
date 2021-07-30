import React from "react"
import { connect } from "react-redux"
import Tile from "../../Tile"
import store from "../../../redux/store"

class User extends React.Component {
  state = {
    data: {},
  }

  updateData() {
    let data = store.getState().request?.data
    if (typeof localStorage !== "undefined") {
      data["_token"] = localStorage.getItem("_token")
      data["_csrf_token"] = localStorage.getItem("_csrf_token")
    }
    this.setState({ data })
  }

  componentDidMount() {
    this.updateData()

    this.subsriber = store.subscribe(() => {
      this.updateData()
    })
  }

  componentWillUnmount() {
    this.subsriber()
  }

  render() {
    let data = this.state

    return (
      <Tile title={"Session data"} hideable={false}>
      <pre className={"error"}>
        {JSON.stringify(data.data, null, 4)}
      </pre>
      </Tile>
    )
  }
}

export default connect()(User)
