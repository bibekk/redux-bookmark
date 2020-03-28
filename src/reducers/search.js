import {SEARCH_RESULT, CLEAN_SEARCH} from '../actions'

export const search =(state=[], action) =>{
    switch(action.type){
        case SEARCH_RESULT: return  action.data // [{result: action.data,searchtext: action.searchtext}]
        case CLEAN_SEARCH: return []
        default: return state
    }
}
