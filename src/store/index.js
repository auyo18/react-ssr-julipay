import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
})

const getStore = () => createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const getClientStore = () => {
  const defaultState = window.initialState || {}
  return createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)))
}

export {getStore, getClientStore}
