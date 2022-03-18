import {createStore,applyMiddleware} from 'redux'
import createDagaMiddleware from 'redux-saga'

import reducer from  './reducer'
import rootSaga from './saga'

const sagaMiddleware=createDagaMiddleware()

export default createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);