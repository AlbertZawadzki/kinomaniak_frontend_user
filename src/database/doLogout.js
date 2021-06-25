import databaseConfig from "./config"
import store from "../redux/store"
import { setUser } from "../redux/actions/request"
import { addNotification } from "../redux/actions/notification"

const doLogout = async () => {
  const axios = databaseConfig.getAxios()

  return await axios.post(databaseConfig.LOGOUT_URL, null, { params: databaseConfig.getParams() }).then(response => {
    databaseConfig.handleResponse(response, null, true)
    store.dispatch(setUser(null))
  })
    .catch(error => {
      console.error(error)

      store.dispatch(addNotification({
        status: "failure",
        message: JSON.stringify(error.message, null, 2),
      }))

      return false
    })
}

export default doLogout
