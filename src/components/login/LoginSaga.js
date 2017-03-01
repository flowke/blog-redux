import {call, put, take, fork} from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import {push} from 'react-router-redux';

import {store} from 'src/app';
import {changeNavAll} from 'layouts/nav/NavRedux';
import {changeState as changeLoginState} from 'components/login/LoginRedux';

function doRequest(url, data){
    return new Promise( (resolve, reject)=>{
        $.post(url, data)
        .done( (data)=>{
            resolve(data);
        });
    } );
}

function* doLogin( url,data ){

    yield put( changeLoginState('pend',{
        isPending: true
    }) );

    let { code, msg } = yield call(doRequest, url, data);

    yield put( changeLoginState('pend',{
        isPending: false
    }) );

    if(code===0){

        store.dispatch( push('/') );

        yield put ( changeLoginState('hasLogin', true) );

        yield put( changeNavAll({
            whichView: 'home'
        }) );



    }else if(code===1){
        yield put ( changeLoginState('resWrong',msg) );
    }else if(code===2){
        yield put ( changeLoginState('resWrong',msg) );
    }
}

function* loginFlow(getState){

    while(true){
        const {url, data} = yield take('LOGIN_REQUEST');

        const loginTask = yield fork(doLogin, url, data);

        const action = yield take(['LOGOUT', 'LOGIN_FAIL']);

        if( action.type === 'LOGOUT' ){

        };
    }
}

function* signupFlow( {url, data} ){
    const {code, msg} = yield call( doRequest, url, data);

    if(code===0){
        yield call( ()=>{
            return new Promise( (resolve)=>{
                setTimeout( ()=>{
                    resolve();
                } ,1200);
            } );
        });

        yield put( changeNavAll({
            hasLogin: true,
            whichView: 'home'
        }) );

        yield call( ()=>{
            return new Promise( (resolve)=>{
                store.dispatch(push('/'));
                resolve();
            } );
        } );
    }
}


export function* watchSignup(){
    yield* takeEvery('SIGNUP_REQUEST',signupFlow);
}

export default [loginFlow];
