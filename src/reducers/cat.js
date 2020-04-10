import {FETCH_BM_CAT_SUCCESS,EDIT_CAT,CANCEL_CAT_EDIT, UPDATE_SUCCESS_CAT, DELETE_SUCCESS_CAT} from '../actions'

export const categories =(state=[], action) =>{
  switch(action.type){
    case FETCH_BM_CAT_SUCCESS: return action.items
    case EDIT_CAT: return editCatReducer(state,action)
    case CANCEL_CAT_EDIT: return cancelCatEditReducer(state, action)
    case UPDATE_SUCCESS_CAT: return updateCatSuccessReducer(state,action)
    case DELETE_SUCCESS_CAT: return state.filter(c => c.cat_id !== action.cat_id)
    default: return state
  }
}

const editCatReducer  =  (state, action) =>{
  let _cats =[]
   _cats = state.map( cat =>
     (cat.cat_id === action.cat_id)?Object.assign({},cat, {editMode: true}): cat
  )
  return Object.assign(_cats)
}

const updateCatSuccessReducer  =  (state, action) =>{
  let _cats =[]
   _cats = state.map( cat =>
     (cat.cat_id === action.cat_id)?Object.assign({},cat, {editMode: undefined, category: action.category}): cat
  )
  return Object.assign(_cats)
}

const cancelCatEditReducer  =  (state, action) =>{
  let _cats =[]
   _cats = state.map( cat =>
     (cat.cat_id === action.cat_id)?Object.assign({},cat, {editMode: undefined}): cat
  )
  return Object.assign(_cats)
}
