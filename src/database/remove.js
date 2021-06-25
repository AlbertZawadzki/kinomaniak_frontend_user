import databaseConfig from "./config"
import store from "../redux/store"
import { addNotification } from "../redux/actions/notification"

const remove = async (url, action) => {
  const axios = databaseConfig.getAxios()

  if (!window.confirm("Are you sure?")) {
    return
  }

  if (!databaseConfig.canMakeRequest()) {
    store.dispatch(addNotification({
      status: "unknown",
      message: `Timeouting`,
    }))
    setTimeout(() => remove(url, action), 1000)
    return
  }

  store.dispatch(addNotification({ status: "processing" }))

  return await axios.delete(url, {
      params: databaseConfig.getParams(),
    },
  ).then(response => {
    return databaseConfig.handleResponse(response, action)
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

export default remove
