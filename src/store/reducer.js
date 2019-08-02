import {combineReducers} from 'redux'
import types from './types'
import homeReducer from '../views/Home/store/reducer'
import sideReducer from '../layouts/Side/store/reducer'
import categoryReducer from '../views/Category/store/reducer'
import articleReducer from '../views/Article/store/reducer'
import tagReducer from '../views/Tag/store/reducer'

const defaultState = {
  siteInfo: {},
  categoryList: []
}

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SITE_INFO:
      return Object.assign({}, state, {
        siteInfo: action.siteInfo
      })
    case types.SET_CATEGORY_LIST:
      return Object.assign({}, state, {
        categoryList: action.categoryList
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
  article: articleReducer,
  tag: tagReducer
})

export default reducer
