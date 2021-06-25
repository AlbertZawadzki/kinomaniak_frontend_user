import * as actions from "../actionNames/seo"

export const setSeos = (data) => ({
  type: actions.SEO_SET,
  data: data,
})

export const addSeo = (data) => ({
  type: actions.SEO_ADD,
  data: data,
})

export const removeSeo = (id) => ({
  type: actions.SEO_REMOVE,
  id: id,
})

export const updateSeo = (data) => ({
  type: actions.SEO_UPDATE,
  data: data,
})
