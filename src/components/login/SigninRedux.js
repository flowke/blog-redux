import {pre} from 'util/String'
// 包含了 panel.js 的所有 reducer, action creator 和 constants
const initialState = {
    username: {
        wrongMsg: ''
    },
    passw: {
        wrongMsg: ''
    },
    cfpassw: {
        wrongMsg: ''
    },
    resWrong: ''
};
// constants, 也就是 action 中的 type 字段,用来标示 action
let prefix = 'SIGNIN'

const CHANGE_USERNAME_STATE = pre(prefix, 'CHANGE_USERNAME_STATE');
const CHANGE_PASSW_STATE = pre(prefix, 'CHANGE_PASSW_STATE');
const CHANGE_RESWRONG_STATE = pre(prefix, 'CHANGE_RESWRONG_STATE');
const CHANGE_CFPASSW_STATE = pre(prefix, 'CHANGE_CFPASSW_STATE');
const CHANGE_ALL_STATE = pre(prefix, 'CHANGE_ALL_STATE');

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
        case 'cfpassw':
            type = CHANGE_CFPASSW_STATE;
            break;
        case 'res':
            type = CHANGE_RESWRONG_STATE;
            break;
        case 'all':
            type = CHANGE_ALL_STATE;
            break;
        default:
            throw(new Error('你应该指定一个正确的 token '));
            return;
    }

    return {
        type: type,
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
        case CHANGE_CFPASSW_STATE:
            return Object.assign({},state,{
                cfpassw: action.data
            });
            break;
        case CHANGE_RESWRONG_STATE:
            return Object.assign({},state,{
                resWrong: action.data
            });
        case CHANGE_ALL_STATE:
            return Object.assign({},state, action.data, {
                resWrong: ''
            });
            break;
        default:
            return state;
    }
}
