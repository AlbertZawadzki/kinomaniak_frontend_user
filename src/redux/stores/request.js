import * as actions from "../actionNames/request"

const initCsrf = Math.random().toString(36).substring(7)

const request = (
  state = {
    data: {
      csrf_name: initCsrf,
      csrf_correct: true,
      user: null,
      country_code: "unknown",
      country: "unknown",
      longitude: "unknown",
      latitude: "unknown",
      blocked: false,
    },
  },
  action,
) => {
  switch (action.type) {
    case actions.USER_SET:
      state.data.user = action.data
      return state
    case actions.CSRF_NAME_SET:
      state.data.csrf_name = action.data
      return state
    case actions.CSRF_CORRECT_SET:
      state.data.csrf_correct = action.data
      return state
    case actions.COUNTRY_CODE_SET:
      state.data.country_code = action.data
      return state
    case actions.COUNTRY_SET:
      state.data.country = action.data
      return state
    case actions.LONGITUDE_SET:
      state.data.longitude = action.data
      return state
    case actions.LATITUDE_SET:
      state.data.latitude = action.data
      return state
    case actions.BLOCK_REQUESTS:
      state.data.blocked = true
      return state
    case actions.UNBLOCK_REQUESTS:
      state.data.blocked = false
      return state
    default:
      return state
  }
}

export default request
