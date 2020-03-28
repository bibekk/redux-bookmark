import {combineReducers} from 'redux'
import {items,activeMenu,activeCategory, itemsHasErrored, itemsIsLoading,terms, bookmarksAdded, isValidLogin, loading_status } from './bm'
import {categories } from './cat'
import {search} from './search'


export default combineReducers({
    items,
    terms,
    activeMenu,
    activeCategory,
    categories,
    search,
    itemsHasErrored,
    itemsIsLoading,
    bookmarksAdded,
    isValidLogin,
    loading_status
})
