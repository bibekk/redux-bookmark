import {combineReducers} from 'redux'
import {items,activeMenu, categories, itemsHasErrored, itemsIsLoading,terms } from './items'

export default combineReducers({
    items,
    terms,
    activeMenu,
    categories,
    itemsHasErrored,
    itemsIsLoading
})
