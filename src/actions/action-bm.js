import {ITEMS_FETCH_DATA_SUCCESS, SET_ACTIVE_MENU, ADD_BOOKMARK, EDIT_BOOKMARK ,CANCEL_BOOKMARK_EDIT} from './index'
import {base_url} from './index'

export const setActiveMenu = (menu) => {
    return {
        type: SET_ACTIVE_MENU,
        menu
    }
}

export const cancelEdit = (id) => {
    return {
        type: CANCEL_BOOKMARK_EDIT,
        id
    }
}


export const itemsHasErrored = (bool) =>{
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    }
}


export const itemsIsLoading =(bool) => {
    return{
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    }
}

export const itemsFetchDataSuccess =(items) => {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    }
}



export const createBookmark =(url)=>{
    return {
        type: ADD_BOOKMARK,
        url
    }
}

export const editBM = (id) => {
    return {
        type: EDIT_BOOKMARK,
        id
    }
}

export const  errorAfterFiveSeconds = () => {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true))
        }, 5000);
    };
}



/*
export const addBookmark = (url, cat_id) => {
    return {
        type: ADD_BOOKMARK,
        url,
        cat_id
    }
}*/

export const fetchBMByCat = (cat_id) => {
    return (dispatch) => {
        //dispatch(itemsIsLoading(true))
        fetch(base_url+'/getBookmarksByCategory/'+cat_id).then(response =>{
            if(!response.ok){
                throw Error(response.statusText)
            }
            //dispatch(itemsIsLoading(false))
            return response
        })
        .then(response => response.json())
        .then(items => dispatch(itemsFetchDataSuccess(items)))
        .catch(()=> dispatch(itemsHasErrored(true)) )
    }
}



export const addBookmark = (url,cat_id) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            dispatch(createBookmark(url))
            fetch( base_url +"/addBookmark",{
                       method: 'post',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                       body: JSON.stringify({url: url , cat_id: cat_id})
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchBMByCat(cat_id))
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}


export const deleteBM = (id,cat_id) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            fetch( base_url+'/'+id,{
                       method: 'delete',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchBMByCat(cat_id))
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}

export const updateBM = (id,url,cat_id) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            fetch( base_url+'/updateBookmark',{
                       method: 'put',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                        body: JSON.stringify({url: url , cat_id: cat_id, id: id})
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchBMByCat(cat_id))
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}
