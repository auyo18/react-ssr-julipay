import {combineReducers} from 'redux'
import types from './types'
import homeReducer from '../views/Home/store/reducer'
import sideReducer from '../layouts/Side/store/reducer'
import categoryReducer from '../views/Category/store/reducer'
import articleReducer from '../views/Article/store/reducer'

const defaultState = {
  siteInfo: {},
  categoryInfo: []
}

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SITE_INFO:
      return Object.assign({}, state, {
        siteInfo: action.siteInfo
      })
    case types.SET_CATEGORY_INFO:
      return Object.assign({}, state, {
        categoryInfo: action.categoryInfo
      })
    default:
      return state
  }
}

const reducer = combineReducers({
  common: commonReducer,
  home: homeReducer,
  side: sideReducer,
  category: categoryReducer,
  article: articleReducer
})

export default reducer
