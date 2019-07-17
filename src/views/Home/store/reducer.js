import types from './types'

const defaultState = {
  bannerList: [],
  articleList: [],
  total: 0
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
    default:
      return state
  }
}
