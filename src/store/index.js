import Vue from 'vue'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './reducers'
import actions from './actions'
import middleware from './middleware'
import router from '../router'
import { saveState, loadState } from '../localStorage'
import throttle from 'lodash.throttle'

const composeEnhancers = composeWithDevTools({})

const store = createStore(reducer, loadState(), composeEnhancers(applyMiddleware(...middleware)))

store.subscribe(throttle(() => saveState(store.getState()), 1000))

export default store
