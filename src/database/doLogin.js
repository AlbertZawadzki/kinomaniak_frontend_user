import databaseConfig from "./config"
import store from "../redux/store"
import { addNotification } from "../redux/actions/notification"

const doLogin = async (form) => {
  const axios = databaseConfig.getAxios()

  return await axios.post(databaseConfig.LOGIN_URL, form).then(async response => {
    databaseConfig.handleResponse(response)
    databaseConfig.setParams(response.data)

    await databaseConfig.initData()
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

export default doLogin
