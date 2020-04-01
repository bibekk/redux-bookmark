import React from 'react';
import {useSelector} from 'react-redux'
import Bookmarkslist from '../components/bookmarkslist'

function Search(props){
    const { isLoading}  = props
    const search = useSelector(state => state.search)
    const cat = useSelector(state => state.categories)
    
    if(isLoading){
        return(
            <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Searching...</div>
        )
    }
    return(
        <Bookmarkslist items={search} search={true} cat={cat} searchText={search.searchtext}/>
    )
}   

export default Search
