import types from './types'

const defaultState = {
  articleContent: {},
  articleNotFound: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_ARTICLE_CONTENT:
      return Object.assign({}, state, {
        articleContent: action.articleContent
      })
    case types.SET_ARTICLE_NOT_FOUND:
      return Object.assign({}, state, {
        articleNotFound: action.articleNotFound
      })
    default:
      return state
  }
}
