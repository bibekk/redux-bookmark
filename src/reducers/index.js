import {combineReducers} from 'redux'
import {items,activeMenu, categories, itemsHasErrored, itemsIsLoading} from './items'

export default combineReducers({
    items,
    activeMenu,
    categories,
    itemsHasErrored,
    itemsIsLoading
})
