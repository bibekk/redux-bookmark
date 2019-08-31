import {combineReducers} from 'redux'
import {items,activeMenu, itemsHasErrored, itemsIsLoading,terms, bookmarksAdded, isValidLogin, loading_status } from './bm'
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
    isValidLogin,
    loading_status
})
