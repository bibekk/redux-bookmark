import {combineReducers} from 'redux'
import {items,activeMenu, itemsHasErrored, itemsIsLoading,terms } from './bm'
import {categories } from './cat'


export default combineReducers({
    items,
    terms,
    activeMenu,
    categories,
    itemsHasErrored,
    itemsIsLoading
})
