import { combineReducers } from 'redux';
let initialState = {
    hasLogin: false,
    whichView: 'home'
}

const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE';
const CHANGE_VIEW_SELECTOR = 'CHANGE_VIEW_SELECTOR';
const CHANGE_NAV_ALL_STATE = 'CHANGE_NAV_ALL_STATE';

export function changeLoginState(bol){
    return {
        type: CHANGE_LOGIN_STATE,
        data: bol
    }
}
export function changeView(str){
    return {
        type: CHANGE_VIEW_SELECTOR,
        data: str
    }
}

export function changeNavAll(data){
    return {
        type: CHANGE_NAV_ALL_STATE,
        data: data
    }
}

export default (state = initialState, action)=>{
    switch(action.type){
        case CHANGE_LOGIN_STATE:
            return Object.assign({},state,{
                hasLogin: action.data
            });
        case CHANGE_VIEW_SELECTOR:
            return Object.assign({},state,{
                whichView: action.data
            });
        case CHANGE_NAV_ALL_STATE:
            return action.data;
        default:
            return state;
    }
}
// export default combineReducers({
//     navState
// })
