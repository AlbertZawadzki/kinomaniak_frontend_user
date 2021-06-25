import databaseConfig from "./config"
import store from "../redux/store"
import { setUser } from "../redux/actions/request"
import { addNotification } from "../redux/actions/notification"

const auth = async () => {
  const axios = databaseConfig.getAxios()

  if (!databaseConfig.canMakeRequest()) {
    return
  }

  databaseConfig.blockRequests()
  return await axios.post(databaseConfig.AUTH_URL, null, { params: databaseConfig.getParams() })
    .then(async response => {
      databaseConfig.unblockRequests()
      databaseConfig.handleResponse(response, null, true)
      // FIXME:
      databaseConfig.initData()
      databaseConfig.setParams(response.data)
      store.dispatch(setUser(response.data.data))
    })
    .catch(error => {
      console.error(error)
      databaseConfig.unblockRequests()

      store.dispatch(addNotification({
        status: "failure",
        message: JSON.stringify(error.message, null, 2),
      }))

      store.dispatch(setUser(null))
      return false
    })
}

export default auth
