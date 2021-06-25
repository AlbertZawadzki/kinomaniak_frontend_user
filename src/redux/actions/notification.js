import * as actions from "../actionNames/notification"

export const addNotification = (data) => ({
  type: actions.NOTIFICATION_ADD,
  data: data,
})

export const removeNotification = (id) => ({
  type: actions.NOTIFICATION_REMOVE,
  id: id,
})
