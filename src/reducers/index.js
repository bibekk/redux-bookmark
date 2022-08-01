import {combineReducers} from 'redux'
import {items, cat_heir, activeMenu,activeCategory, itemsHasErrored, itemsIsLoading,terms, bookmarksAdded, isValidLogin, loading_status } from './bm'
import {categories } from './cat'
import {search} from './search'


export default combineReducers({
    items,
    terms,
    cat_heir,
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
