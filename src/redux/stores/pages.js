import * as actions from "../actionNames/page"

const vpns = (state = { data: [], was_fetched: false }, action) => {
  switch (action.type) {
    case actions.PAGE_ADD:
      state.data.push(action.data)
      return state
    case actions.PAGE_REMOVE:
      state.data = state.data.filter(page => page.id !== action.id)
      return state
    case actions.PAGE_SET:
      state.was_fetched = !!action.data
      state.data = action.data || []
      return state
    case actions.PAGE_UPDATE:
      let found = false
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.data.id) {
          state.data[i] = action.data
          found = true
          break
        }
      }
      if (!found) {
        state.data.push(action.data)
      }
      return state
    default:
      return state
  }
}

export default vpns
