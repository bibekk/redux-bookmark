import { FETCH_TERMS_SUCCESS, ADD_TERM, DELETE_TERM, base_url, VALID, LOADING } from "./index"
import { itemsHasErrored } from "./action-bm"

export const fetchTermsFromDBSuccess = (items) => {
  return {
    type: FETCH_TERMS_SUCCESS,
    items,
  }
}

export const createTerm = (term) => {
  return {
    type: ADD_TERM,
    term,
  }
}

export const deleteTerm = (cat_id) => {
  return {
    type: DELETE_TERM,
    cat_id,
  }
}

export const fetchTermsFromDB = () => {
  return async (dispatch) => {
    try {
      const pass1 = await fetch(base_url() + "/terms")
      const terms = await pass1.json()
      dispatch(fetchTermsFromDBSuccess(terms))
    } catch (err) {
      dispatch(itemsHasErrored(true))
    }
  }
}
/* 
export const fetchTermsFromDB2 = () => {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true))

    fetch(base_url()+'/terms').then(response =>{
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
} */

export const addTermToDB = (term) => {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true))
    dispatch(createTerm(term))
    fetch(base_url() + "/terms", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ term: term }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          alert(`Term "${term}" added successfully!`)
          dispatch(fetchTermsFromDB())
        } else {
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
    fetch(base_url() + "/terms/" + id, {
      method: "delete",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          dispatch(fetchTermsFromDB())
        } else {
          dispatch(itemsHasErrored(true))
        }
      })
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}

//login

export const matchPass = (pass) => {
  return (dispatch) => {
    dispatch({ type: LOADING, data: true })
    fetch(base_url() + "/getPass/", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ password: pass }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch({ type: LOADING, data: false })
        return response
      })
      .then((response) => response.json())
      .then((data) => dispatch({ type: VALID, data: data[0].total }))
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}
