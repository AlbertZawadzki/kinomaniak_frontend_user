import * as actions from "../actionNames/request"

export const setUser = (data) => ({
  type: actions.USER_SET,
  data: data,
})

export const setCsrfName = (data) => ({
  type: actions.CSRF_NAME_SET,
  data: data,
})

export const setCsrfCorrect = (data) => ({
  type: actions.CSRF_CORRECT_SET,
  data: data,
})

export const setCountry = (data) => ({
  type: actions.COUNTRY_SET,
  data: data,
})

export const setCountryCode = (data) => ({
  type: actions.COUNTRY_CODE_SET,
  data: data,
})

export const setLatitude = (data) => ({
  type: actions.LATITUDE_SET,
  data: data,
})

export const setLongitude = (data) => ({
  type: actions.LONGITUDE_SET,
  data: data,
})

export const blockRequests = () => ({
  type: actions.BLOCK_REQUESTS,
})

export const unblockRequests = () => ({
  type: actions.UNBLOCK_REQUESTS,
})

