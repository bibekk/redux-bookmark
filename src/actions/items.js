import {ITEMS_FETCH_DATA_SUCCESS, FETCH_BM_CAT_SUCCESS, SET_ACTIVE_MENU, ADD_BOOKMARK, ADD_CAT} from './index'

const base_url = 'http://localhost:8080/bookmark'


export const setActiveMenu = (menu) => {
    return {
        type: SET_ACTIVE_MENU,
        menu
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

export const fetchBlogCatSuccess = (items) =>{
    return {
        type: FETCH_BM_CAT_SUCCESS,
        items
    }
}

export const createBookmark =(url)=>{
    return {
        type: ADD_BOOKMARK,
        url
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

export const addCat = (cat) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
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
