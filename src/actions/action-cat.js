import { ADD_CAT,FETCH_BM_CAT_SUCCESS, DEL_CAT,base_url} from './index'
import {itemsHasErrored} from './action-bm'


export const fetchBlogCatSuccess = (items) =>{
    return {
        type: FETCH_BM_CAT_SUCCESS,
        items
    }
}

export const createCategory = (cat)=>{
    return {
        type: ADD_CAT,
        cat
    }
}

export const delCategory = (cat_id) =>{
    return {
        type: DEL_CAT,
        cat_id
    }
}

export const fetchBMCat = () => {
    return (dispatch) => {
        //dispatch(itemsIsLoading(true))

        fetch(base_url+'/category').then(response =>{
            if(!response.ok){
                throw Error(response.statusText)
            }

            //dispatch(itemsIsLoading(false))
            return response
        })
        .then(response => response.json())
        .then(items => dispatch(fetchBlogCatSuccess(items)))
        .catch(()=> dispatch(itemsHasErrored(true)) )
    }
}

export const addCat = (cat) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            dispatch(createCategory(cat))
            fetch( base_url +"/addCat",{
                       method: 'post',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                       body: JSON.stringify({category: cat})
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchBMCat())
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}


export const deleteCat = (cat_id) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            dispatch(delCategory(cat_id))
            fetch( base_url +"/category/"+cat_id,{
                       method: 'delete',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchBMCat())
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}
