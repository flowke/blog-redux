import { combineReducers } from 'redux';
import {pre} from 'util/String';

let initialState = {
    whichView: 'home'
}

let prefix = 'NAV';

const CHANGE_VIEW_SELECTOR = pre(prefix, 'CHANGE_VIEW_SELECTOR');
const CHANGE_NAV_ALL_STATE = pre(prefix, 'CHANGE_NAV_ALL_STATE');


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
