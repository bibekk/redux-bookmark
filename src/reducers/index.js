import {combineReducers} from 'redux'
import {items,activeMenu, itemsHasErrored, itemsIsLoading,terms, bookmarksAdded, isValidLogin } from './bm'
import {categories } from './cat'


export default combineReducers({
    items,
    terms,
    activeMenu,
    categories,
    itemsHasErrored,
    itemsIsLoading,
    bookmarksAdded,
    isValidLogin
})
