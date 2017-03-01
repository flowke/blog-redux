
import { pre } from 'util/String';

let initialState = {
    album: []
}

let prefix = 'MAIN';


const ADD_ALBUM =  pre(prefix,'ADD_ALBUM');
const DEL_ALBUM =  pre(prefix,'DEL_ALBUM');
const CHANGE_ALBUM =  pre(prefix,'CHANGE_ALBUM');

export function changeAlbum(data=[]){
    return {
        type: CHANGE_ALBUM,
        data
    }
}

export default (state= initialState, action)=>{
    let {type, data} = action;
    switch(type){
        case ADD_ALBUM:
            return {
                ...state,
                album: data
            }
        default:
            return state;
    }
}
