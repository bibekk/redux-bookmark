import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds} from '../actions/action-bm'
import {fetchBMCat} from '../actions/action-cat'
import Header from '../components/header'
import Home from './home'
import Managebookmarks from './managebookmarks'
import Managecat from './managecat'
import {Container} from 'semantic-ui-react'

class ItemList extends Component {



  render() {
      const {activeMenu, hasErrored, isLoading}  = this.props
      let _activeComp

      if(hasErrored){
          return (
              <p>Error!!</p>
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
          case 'Bookmarks': _activeComp = <Managebookmarks />;break;
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
        cat: state.categories
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchBMByCat : (cat_id) => fetchBMByCat(cat_id), //for fetching booksmarks by selected category
            fetchBMCat: fetchBMCat, //for fetching categories and count
            errorOut: errorAfterFiveSeconds,
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
