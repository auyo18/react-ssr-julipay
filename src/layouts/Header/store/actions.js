import types from './types'

export const setNavState = showNav => ({
  type: types.SET_NAV_STATE,
  showNav
})

export const setSearchState = showSearch => ({
  type: types.SET_SEARCH_STATE,
  showSearch
})
