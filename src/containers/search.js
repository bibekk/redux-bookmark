import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Bookmarkslist from '../components/bookmarkslist'

function Search(props){
    const {search, isLoading, cat}  = props
    if(isLoading){
        return(
            <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Searching...</div>
        )
    }
    return(
    <Bookmarkslist items={search} search={true} cat={cat} searchText={search.searchtext}/>
    )
}


const mapStateToProps = (state) => {
    return {
        search: state.search,
        cat: state.categories
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Search)
