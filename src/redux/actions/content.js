import * as actions from "../actionNames/content"

export const setContents = (data) => ({
  type: actions.CONTENT_SET,
  data: data,
})

export const addContent = (data) => ({
  type: actions.CONTENT_ADD,
  data: data,
})

export const removeContent = (id) => ({
  type: actions.CONTENT_REMOVE,
  id: id,
})

export const updateContent = (data) => ({
  type: actions.CONTENT_UPDATE,
  data: data,
})
