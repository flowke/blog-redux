// 包含了 panel.js 的所有 reducer, action creator 和 constants
const initialState = {
    username: {
        hintClass: '',
        wrongMsg: ''
    },
    passw: {
        hintClass: '',
        wrongMsg: ''
    },
    cfpassw: {
        hintClass: '',
        wrongMsg: ''
    }
};
// constants, 也就是 action 中的 type 字段,用来标示 action
const CHANGE_SIGNIN_USERNAME_STATE = 'CHANGE_SIGNIN_USERNAME_STATE';
const CHANGE_SIGNIN_PASSW_STATE = 'CHANGE_SIGNIN_PASSW_STATE';
const CHANGE_SIGNIN_CFPASSW_STATE = 'CHANGE_SIGNIN_CFPASSW_STATE';
const CHANGE_SIGNIN_ALL_STATE = 'CHANGE_SIGNIN_ALL_STATE';

// action creator, 创建 action
export function changeState( token, data){
    let type = '';
    switch(token){
        case 'username':
            type = CHANGE_SIGNIN_USERNAME_STATE;
            break;

        case 'passw':
            type = CHANGE_SIGNIN_PASSW_STATE;
            break;
        case 'cfpassw':
            type = CHANGE_SIGNIN_CFPASSW_STATE;
            break;
        case 'all':
            type = CHANGE_SIGNIN_ALL_STATE;
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
        case CHANGE_SIGNIN_USERNAME_STATE:
            return Object.assign({}, state, {
                username: action.data
            });
            break;
        case CHANGE_SIGNIN_PASSW_STATE:
            return Object.assign({}, state, {
                passw: action.data
            });
            break;
        case CHANGE_SIGNIN_CFPASSW_STATE:
            return Object.assign({},state,{
                cfpassw: action.data
            });
            break;
        case CHANGE_SIGNIN_ALL_STATE:
            return action.data;
            break;
        default:
            return state;
    }
}
