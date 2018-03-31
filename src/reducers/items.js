import {ITEMS_FETCH_DATA_SUCCESS, FETCH_BM_CAT_SUCCESS, SET_ACTIVE_MENU, FETCH_TERMS_SUCCESS} from '../actions'

export const itemsHasErrored = (state = false, action) =>{
    switch(action.type){
        case 'ITEMS_HAS_ERRORED': return action.hasErrored
        default: return state
    }
}

export const itemsIsLoading =(state = false, action) =>{
    switch(action.type){
        case 'ITEMS_IS_LOADING': return action.isLoading
        default: return state
    }
}

export const items =(state = [], action) =>{
    switch(action.type){
        case ITEMS_FETCH_DATA_SUCCESS: return action.items
        default: return state
    }
}

export const categories =(state=[], action) =>{
    switch(action.type){
        case FETCH_BM_CAT_SUCCESS: return action.items
        default: return state
    }
}

export const terms =(state=[], action) =>{ //console.log(action);
    switch(action.type){
        case FETCH_TERMS_SUCCESS: return action.items
        default: return state
    }
}

var initialState = 'Home'

export const activeMenu = (state = initialState, action) => {
    switch(action.type){
        case SET_ACTIVE_MENU : return action.menu
        default: return state
    }
}
