import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds} from '../actions/action-bm'
import {matchPass} from '../actions/action-terms'

import {fetchBMCat} from '../actions/action-cat'
import Header from '../components/header'
import Home from './home'
import Managebookmarks from './managebookmarks'
import Manageterms from './manageterms'
import Managecat from './managecat'
import {Container} from 'semantic-ui-react'
import Login from './login'
class ItemList extends Component {
      
    processLogin  = (pass)=>{
       this.props.matchPass(pass)
    }


  render() {
        const {activeMenu, hasErrored, isLoading, isValidLogin}  = this.props
        
        let _activeComp

        if(hasErrored){
            return (
                <p>Error!!</p>
            )
        }
        
        if(isValidLogin === 0){
            return <Login processLogin = {(pass) => this.processLogin(pass)} />
        }

        if(isLoading){
            return(
                <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Loading...</div>
            )
        }

        switch(activeMenu) {
            case 'Home': _activeComp = <Home/>; break;
            case 'Categories': _activeComp = <Managecat/>;break;
            case 'Bookmarks': _activeComp = <Managebookmarks />;break;
            case 'Terms': _activeComp = <Manageterms />; break;
            default: _activeComp =  <Home/>
        }

        return (
        <Container>
            <Header />
            {_activeComp}
        </Container>
        );
  }
}


const mapStateToProps = (state) => {
    return {
        activeMenu: state.activeMenu,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        cat: state.categories,
        isValidLogin: state.isValidLogin
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
