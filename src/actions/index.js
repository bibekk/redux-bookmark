export const ENV='uat'

export const ADD_BOOKMARK ='ADD_BOOKMARK'
export const ADD_BOOKMARK_SUCCESS='ADD_BOOKMARK_SUCCESS'
export const EDIT_BOOKMARK = 'EDIT_BOOKMARK'
export const CANCEL_BOOKMARK_EDIT = 'CANCEL_BOOKMARK_EDIT'
export const UPDATE_SUCCESS_BM = 'UPDATE_SUCCESS_BM'
export const DELETE_SUCCESS_BM ='DELETE_SUCCESS_BM'
export const BOOKMARK_ADDED_SET_OFF = 'BOOKMARK_ADDED_SET_OFF'

export const ADD_CAT = 'ADD_CAT'
export const DEL_CAT = 'DEL_CAT'
export const EDIT_CAT = 'EDIT_CAT'
export const CANCEL_CAT_EDIT = 'CANCEL_CAT_EDIT'
export const UPDATE_SUCCESS_CAT = 'UPDATE_SUCCESS_CAT'
export const DELETE_SUCCESS_CAT = 'DELETE_SUCCESS_CAT'

export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS'
export const FETCH_BM_CAT_SUCCESS = 'FETCH_BM_CAT_SUCCESS'
export const SET_ACTIVE_MENU ='SET_ACTIVE_MENU'

export const FETCH_TERMS_SUCCESS ='FETCH_TERMS_SUCCESS'
export const ADD_TERM = 'ADD_TERM'
export const DELETE_TERM = 'DELETE_TERM'
export const VALID = 'VALID'

export const SEARCH_RESULT = 'SEARCH_RESULT'
export const CLEAN_SEARCH = 'CLEAN_SEARCH'

export const base_url = () =>  {
    if(ENV === 'uat'){
        return 'http://'+window.location.hostname + ":8080/bookmark" //'http://192.168.1.146:8080/bookmark'
    }else{
        return 'http://'+window.location.hostname + ":8080/bookmark"
    }

}
//export const base_url =  'http://192.168.1.147:8080/bookmark'
//'http://' + window.location.hostname + ":8080/bookmark"// 'http://localhost:8080/bookmark'  //

export const LOADING = 'LOADING'