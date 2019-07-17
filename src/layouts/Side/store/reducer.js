import types from './types'

const defaultState = {
  recommendList: [],
  polymerizationList: [],
  oneRandomArticle: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_RECOMMEND_ARTICLE:
      return Object.assign({}, state, {
        recommendList: action.recommendList
      })
    case types.SET_POLYMERIZATION_ARTICLE:
      return Object.assign({}, state, {
        polymerizationList: action.polymerizationList
      })
    case types.SET_ONE_RANDOM_ARTICLE:
      return Object.assign({}, state, {
        oneRandomArticle: action.oneRandomArticle
      })
    default:
      return state
  }
}
