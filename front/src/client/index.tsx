// @ts-ignore
import * as React from "react"
// @ts-ignore
import * as ReactDom from 'react-dom'
// @ts-ignore
import * as createLogger from 'redux-logger'
// @ts-ignore
import thunk from 'redux-thunk'
// @ts-ignore
import { createStore, applyMiddleware } from 'redux'
// @ts-ignore
import {Provider} from 'react-redux'
import mainReducer from './reducers/index'
import App from './containers/app'
window.React = React

const initial = {
  socket: null,
  user: null
}

const store = createStore(
  mainReducer,
  initial,
  applyMiddleware(thunk, createLogger())
)

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('front'))
