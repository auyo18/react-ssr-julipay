import types from './types'

const defaultState = {
  bannerList: [],
  articleList: [],
  total: 0,
  currentPage: 1,
  categoryIndex: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_BANNER_LIST:
      return Object.assign({}, state, {
        bannerList: action.bannerList
      })
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
    case types.SET_CATEGORY_INDEX:
      return Object.assign({}, state, {
        categoryIndex: action.categoryIndex
      })
    default:
      return state
  }
}
