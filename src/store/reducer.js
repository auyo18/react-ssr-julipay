import {combineReducers} from 'redux'
import types from './types'

const defaultState = {
  siteInfo: {}
}

const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SITE_INFO:
      return Object.assign({}, state, {
        siteInfo: action.siteInfo
      })
    default:
      return state
  }
}

const reducer = combineReducers({
  common: commonReducer
})

export default reducer
