import * as actions from "../actionNames/notification"

const notifications = (state = { data: [] }, action) => {
  switch (action.type) {
    case actions.NOTIFICATION_ADD:
      action.data.id = Math.random().toString()
      state.data.push(action.data)
      return state
    case actions.NOTIFICATION_REMOVE:
      state.data = state.data.filter((item) => item.id !== action.id)
      return state
    default:
      return state
  }
}

export default notifications
