import {pre} from 'util/String';
// 包含了 panel.js 的所有 reducer, action creator 和 constants
const initialState = {
    username: {
        wrongMsg: ''
    },
    passw: {
        wrongMsg: ''
    },
    resWrong: '',
    isPending: false,
    hasLogin: false
};
// constants, 也就是 action 中的 type 字段,用来标示 action

let prefix = 'LOGIN';

const CHANGE_USERNAME_STATE = pre(prefix, 'CHANGE_USERNAME_STATE');
const CHANGE_PASSW_STATE = pre(prefix, 'CHANGE_PASSW_STATE');
const CHANGE_RESWRONG_STATE = pre(prefix, 'CHANGE_RESWRONG_STATE');
const CHANGE_ALL_STATE = pre(prefix, 'CHANGE_ALL_STATE');
const CHANGE_PENDING_STATE = pre(prefix, 'CHANGE_PENDING_STATE');
const CHANGE_HASLOGIN_STATE = pre(prefix, 'CHANGE_HASLOGIN_STATE');

// action creator, 创建 action
export function changeState( token, data){
    let type = '';
    switch(token){
        case 'username':
            type = CHANGE_USERNAME_STATE;
            break;

        case 'passw':
            type = CHANGE_PASSW_STATE;
            break;

        case 'resWrong':
            type = CHANGE_RESWRONG_STATE;
            break;

        case 'pend':
            type = CHANGE_PENDING_STATE;
            break;

        case 'logout':
            type: 'LOGOUT';
            break;

        case 'hasLogin':
            type = CHANGE_HASLOGIN_STATE;
            break;

        case 'all':
            type = CHANGE_ALL_STATE;
            break;
            
        default:
            throw( new Error('你应该指定一个正确的 token ') );
            return;
    }

    return {
        type: type,
        data
    }
}

export function doLogin(url,data){
    return {
        type: 'LOGIN_REQUEST',
        url,
        data
    }
}



// reducer, 某个reducer 就相当于某个 state
export default (state = initialState, action) =>{
    switch (action.type){
        case CHANGE_USERNAME_STATE:
            return Object.assign({}, state, {
                username: action.data
            });
            break;
        case CHANGE_PASSW_STATE:
            return Object.assign({}, state, {
                passw: action.data
            });
            break;
        case CHANGE_RESWRONG_STATE:
            return Object.assign({}, state, {
                resWrong: action.data
            });
        case CHANGE_PENDING_STATE:
            return {...state,  isPending: action.data};
        case CHANGE_HASLOGIN_STATE:
            return {...state, hasLogin: action.data};
        case CHANGE_ALL_STATE:
            return Object.assign({}, state, action.data, {
                resWrong: ''
            });
            break;
        default:
            return state;
    }
}
