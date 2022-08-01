import {
  ITEMS_FETCH_DATA_SUCCESS,
  SET_ACTIVE_MENU,
  ADD_BOOKMARK,
  ADD_BOOKMARK_SUCCESS,
  EDIT_BOOKMARK,
  CANCEL_BOOKMARK_EDIT,
  UPDATE_SUCCESS_BM,
  DELETE_SUCCESS_BM,
  FETCH_CAT_HIER,
} from './index'
import { BOOKMARK_ADDED_SET_OFF, SEARCH_RESULT, CLEAN_SEARCH } from "./index"

import { fetchBMCat } from "./action-cat"
import { base_url } from "./index"
import axios from "axios"

export const setActiveMenu = (menu) => {
  return {
    type: SET_ACTIVE_MENU,
    menu,
  }
}

export const cancelEdit = (id) => {
  return {
    type: CANCEL_BOOKMARK_EDIT,
    id,
  }
}

export const updateSuccess = (id, url, cat_id, category) => {
  return {
    type: UPDATE_SUCCESS_BM,
    id,
    url,
    cat_id,
    category,
  }
}

export const deleteSuccess = (id) => {
  return {
    type: DELETE_SUCCESS_BM,
    id,
  }
}

export const itemsHasErrored = (bool) => {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool,
  }
}

export const itemsIsLoading = (bool) => {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool,
  }
}

export const itemsFetchDataSuccess = (items, cat_id) => {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items: items,
    cat_id: cat_id,
  }
}

export const createBookmark = (url) => {
  return {
    type: ADD_BOOKMARK,
    url,
  }
}

export const createBookmarkSuccess = () => {
  return {
    type: ADD_BOOKMARK_SUCCESS,
  }
}

export const editBM = (id) => {
  return {
    type: EDIT_BOOKMARK,
    id,
  }
}

export const cleanSearch = () => {
  return {
    type: CLEAN_SEARCH,
  }
}

export const errorAfterFiveSeconds = () => {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(itemsHasErrored(true))
    }, 5000)
  }
}

export const bookmarksAddedSetOff = () => {
  return {
    type: BOOKMARK_ADDED_SET_OFF,
  }
}

/*
export const addBookmark = (url, cat_id) => {
  return {
    type: ADD_BOOKMARK,
    url,
    cat_id
  }
}*/

export const fetchCategoryHierarchy = () => {
  return async (dispatch) => {
    try {
      dispatch(itemsIsLoading(true))
      const pass1 = await fetch(`${base_url()}/fetchCategoryHierarchy`)
      const items = await pass1.json()
      dispatch({ type: FETCH_CAT_HIER, data: items})
    } catch (err) {
      dispatch(itemsHasErrored(true))
    }
  }
}

export const fetchBMByCat = (cat_id = "34") => {
  return async (dispatch) => {
    try {
      dispatch(itemsIsLoading(true))
      const pass1 = await fetch(`${base_url()}/getBookmarksByCategory/${cat_id}`)
      const items = await pass1.json()
      dispatch(itemsFetchDataSuccess(items, cat_id))
    } catch (err) {
      dispatch(itemsHasErrored(true))
    }
  }
}

/* export const fetchBMByCat = (cat_id) => {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true))
    fetch(base_url()+'/getBookmarksByCategory/'+cat_id).then(response =>{
      if(!response.ok){
        throw Error(response.statusText)
      }
      //dispatch(itemsIsLoading(false))
      return response
    })
    .then(response => response.json())
    .then(items => dispatch(itemsFetchDataSuccess(items, cat_id)))
    .catch(()=> dispatch(itemsHasErrored(true)) )
  }
} */

export const searchData = (text) => {
  return (dispatch) => {
    axios
      .get(base_url() + `/search?searchtext=${text}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: SEARCH_RESULT,
            data: response.data,
            searchtext: text,
          })
        }
      })
      .catch((error) => {
        dispatch(itemsHasErrored(true))
      })
  }
}

export const addBookmark = (url, cat_id) => {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true))
    dispatch(createBookmark(url))
    fetch(base_url() + "/addBookmark", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ url: url, cat_id: cat_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          dispatch(createBookmarkSuccess())
          dispatch(fetchBMByCat(cat_id))
        } else {
          dispatch(itemsHasErrored(true))
        }
      })
      .catch((e) => {
        console.log(e)
        dispatch(itemsHasErrored(true))
      })
  }
}

export const deleteBM = (id, cat_id) => {
  return (dispatch) => {
    fetch(base_url() + "/" + id, {
      method: "delete",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          dispatch(fetchBMCat())
          dispatch(deleteSuccess(id))
          //dispatch(fetchBMByCat(cat_id))
        } else {
          dispatch(itemsHasErrored(true))
        }
      })
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}

export const updateBM = (id, url, cat_id, category, currentcat) => {
  //console.log(id, url, cat_id, category)
  return (dispatch) => {
    //dispatch(itemsIsLoading(true))
    fetch(base_url() + "/updateBookmark", {
      method: "put",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ url: url, cat_id: cat_id, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          dispatch(updateSuccess(id, url, cat_id, category)) //dispatch(fetchBMByCat(cat_id))
          dispatch(fetchBMByCat(currentcat))
        } else {
          dispatch(itemsHasErrored(true))
        }
      })
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}
