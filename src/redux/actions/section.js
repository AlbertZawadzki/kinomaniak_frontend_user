import * as actions from "../actionNames/section"

export const setSections = (data) => ({
  type: actions.SECTIONS_SET,
  data: data,
})

export const addSection = (data) => ({
  type: actions.SECTIONS_ADD,
  data: data,
})

export const removeSection = (id) => ({
  type: actions.SECTIONS_REMOVE,
  id: id,
})

export const updateSection = (data) => ({
  type: actions.SECTIONS_UPDATE,
  data: data,
})
