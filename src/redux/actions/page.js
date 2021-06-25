import * as actions from "../actionNames/page"

export const setPages = (data) => ({
  type: actions.PAGE_SET,
  data: data,
})

export const addPage = (data) => ({
  type: actions.PAGE_ADD,
  data: data,
})

export const removePage = (id) => ({
  type: actions.PAGE_REMOVE,
  id: id,
})

export const updatePage = (data) => ({
  type: actions.PAGE_UPDATE,
  data: data,
})
