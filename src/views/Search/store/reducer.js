import types from './types'

const defaultState = {
  articleList: [],
  total: 0,
  currentPage: 1,
  name: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_ARTICLE_LIST:
      return Object.assign({}, state, {
        articleList: action.articleList
      })
    case types.SET_ARTICLE_TOTAL:
      return Object.assign({}, state, {
        total: action.total
      })
    case types.SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      })
    case types.SET_SEARCH_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}
