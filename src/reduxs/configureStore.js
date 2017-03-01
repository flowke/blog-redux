// 生成 redux store 的关键文件

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer} from 'react-router-redux'; //实现路由状态与 Redux store 的统一
import ThunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import { browserHistory} from 'react-router';
import createSagaMiddleware from 'redux-saga';

import LoginSagas from 'components/login/LoginSaga';

import rootReducer from './reducers.js';

export const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
    applyMiddleware(
        ThunkMiddleware,
        routerMiddleware(browserHistory),
        sagaMiddleware()
    ),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
)(createStore);

const reducer = combineReducers(Object.assign({},rootReducer,{
    routing: routerReducer
}));

export default function configureStore(initialState){
    const store = finalCreateStore(reducer, initialState);
    return store;
}
