import { FETCH_TERMS_SUCCESS, ADD_TERM, DELETE_TERM,base_url} from './index'
import {itemsHasErrored} from './action-bm'

export const fetchTermsFromDBSuccess = (items) =>{
    return {
        type: FETCH_TERMS_SUCCESS,
        items
    }
}

export const createTerm = (term)=>{
    return {
        type: ADD_TERM,
        term
    }
}

export const deleteTerm = (cat_id) =>{
    return {
        type: DELETE_TERM,
        cat_id
    }
}

export const fetchTermsFromDB = () => {
    return (dispatch) => {
        //dispatch(itemsIsLoading(true))

        fetch(base_url+'/terms').then(response =>{
            if(!response.ok){
                throw Error(response.statusText)
            }

            //dispatch(itemsIsLoading(false))
            return response
        })
        .then(response => response.json())
        .then(items => dispatch(fetchTermsFromDBSuccess(items)))
        .catch(()=> dispatch(itemsHasErrored(true)) )
    }
}

export const addTermToDB = (term) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            dispatch(createTerm(term))
            fetch( base_url +"/terms",{
                       method: 'post',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                       body: JSON.stringify({term: term})
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchTermsFromDB())
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}


export const deleteTermFromDB = (id) => {
        return (dispatch) => {
            //dispatch(itemsIsLoading(true))
            dispatch(deleteTerm(id))
            fetch( base_url +"/terms/"+id,{
                       method: 'delete',
                       headers: new Headers({ 'Content-Type': 'application/json'}),
                   }).then( response => response.json() )
                   .then(data =>{
                       if(data.affectedRows === 1){
                           dispatch(fetchTermsFromDB())
                       }else{
                           dispatch(itemsHasErrored(true))
                       }
                    })
                   .catch(() => dispatch(itemsHasErrored(true)))
        }
}
