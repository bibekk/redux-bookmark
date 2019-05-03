import {combineReducers} from 'redux'
import {items,activeMenu, itemsHasErrored, itemsIsLoading,terms, bookmarksAdded, isValidLogin } from './bm'
import {categories } from './cat'
import {search} from './search'


export default combineReducers({
    items,
    terms,
    activeMenu,
    categories,
    search,
    itemsHasErrored,
    itemsIsLoading,
    bookmarksAdded,
    isValidLogin
})
