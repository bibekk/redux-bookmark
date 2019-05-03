import {SEARCH_RESULT, CLEAN_SEARCH} from '../actions'

export const search =(state=[], action) =>{
    switch(action.type){
        case SEARCH_RESULT:  return action.data
        case CLEAN_SEARCH: return []
        default: return state
    }
}
