import React from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds} from '../actions/action-bm'
import {matchPass} from '../actions/action-terms'
import {ENV} from '../actions'
import {fetchBMCat} from '../actions/action-cat'
import Home from './home'
import AddBookmarks from '../components/addbookmark'
import Manageterms from './manageterms'
import Managecat from './managecat'
import {Container, Icon} from 'semantic-ui-react'
import Login from './login'

function ItemList(props){
    const {activeMenu, hasErrored, isLoading, isValidLogin}  = props
    let _activeComp

    const processLogin  = (pass)=> {
       props.matchPass(pass)
    }

    if(hasErrored){
        return (
            <p>Error!!</p>
        )
    }
    
    if(ENV !== 'uat'){
        if(isValidLogin === 0 || isValidLogin === null){
            return <Login processLogin = {(pass) => processLogin(pass)} isValidLogin={isValidLogin} />
        }
    }

    if(isValidLogin === 0){
        return (
            <>
            <h4>Invalid Login</h4>
            <Login processLogin = {(pass) => processLogin(pass)} />
            </>
        )
    }

    if(isLoading){
        return(
            <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Loading...</div>
        )
    }

    switch(activeMenu) {
        case 'Home': _activeComp = <Home/>; break;
        case 'Categories': _activeComp = <Managecat/>;break;
        case 'Bookmarks': _activeComp = <AddBookmarks />;break;
        case 'Terms': _activeComp = <Manageterms />; break;
        default: _activeComp =  <Home/>
    }

    return (
    <Container >
        <h2><Icon name='bookmark outline' size='small'></Icon>Bookmarks</h2>
        {_activeComp}
    </Container>
    );
}


const mapStateToProps = (state) => {
    return {
        activeMenu: state.activeMenu,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        cat: state.categories,
        isValidLogin: state.isValidLogin,
        loading: state.loading_status
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchBMByCat : (cat_id) => fetchBMByCat(cat_id), //for fetching booksmarks by selected category
            fetchBMCat: fetchBMCat, //for fetching categories and count
            errorOut: errorAfterFiveSeconds,
            matchPass: (pass) => matchPass(pass)
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
