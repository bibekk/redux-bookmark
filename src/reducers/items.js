import {ITEMS_FETCH_DATA_SUCCESS, FETCH_BM_CAT_SUCCESS, SET_ACTIVE_MENU, EDIT_CAT,FETCH_TERMS_SUCCESS, EDIT_BOOKMARK, CANCEL_BOOKMARK_EDIT} from '../actions'

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
        case EDIT_BOOKMARK: return editBookmarkReducer(state,action)
        case CANCEL_BOOKMARK_EDIT: return cancelEditBookmarkReducer(state,action)
        default: return state
    }
}

export const categories =(state=[], action) =>{
    switch(action.type){
        case FETCH_BM_CAT_SUCCESS: return action.items
        case EDIT_CAT: return editCatReducer(state,action)
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


const editBookmarkReducer  =  (state, action) =>{
    let _bms =[]
     _bms = state.map( bm =>
       (bm.id === action.id)?Object.assign({},bm, {editMode: true}): bm
    )
    return Object.assign(_bms)
}

const cancelEditBookmarkReducer  =  (state, action) =>{
    let _bms =[]
     _bms = state.map( bm =>
       (bm.id === action.id)?Object.assign({},bm, {editMode: undefined}): bm
    )
    return Object.assign(_bms)
}

const editCatReducer  =  (state, action) =>{
    let _cats =[]
     _cats = state.map( cat =>
       (cat.cat_id === action.cat_id)?Object.assign({},cat, {editMode: true}): cat
    )
    return Object.assign(_cats)
}
