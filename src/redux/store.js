import { combineReducers, createStore } from "redux"
import notifications from "./stores/notifications"
import pages from "./stores/pages"
import sections from "./stores/sections"
import request from "./stores/request"
import seos from "./stores/seos"

const store = createStore(
  combineReducers({
    notifications,
    pages,
    sections,
    request,
    seos,
  }),
)

export default store
