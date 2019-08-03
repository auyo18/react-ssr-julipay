import types from './types'

const defaultState = {
  showNav: false,
  showSearch: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_NAV_STATE:
      return Object.assign({}, state, {
        showNav: action.showNav
      })
    case types.SET_SEARCH_STATE:
      console.log(action.showSearch)
      return Object.assign({}, state, {
        showSearch: action.showSearch
      })
    default:
      return state
  }
}
