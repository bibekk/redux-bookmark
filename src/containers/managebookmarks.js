import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds, fetchBMCat, deleteBM} from '../actions/items'
import Bookmarkslist from '../components/bookmarkslist'
import AddBookmark from '../components/addbookmark'
import {Icon,Button, Divider} from 'semantic-ui-react'

class Managebookmarks extends Component {

   componentDidMount(){
      // this.props.fetchBMByCat(1)
      // this.props.fetchBMCat()
   }

  render() {
      const {items, isLoading, hasErrored}  = this.props

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

     return (
          <div>
              <AddBookmark />
              <Divider />
              <Bookmarkslist items={items} deleteBM={this.props.deleteBM} />
          </div>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchBMByCat : (cat_id) => fetchBMByCat(cat_id), //for fetching booksmarks by selected category
            fetchBMCat: fetchBMCat, //for fetching categories and count
            deleteBM : (id,cat_id) => deleteBM(id,cat_id),
            errorOut: errorAfterFiveSeconds,
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Managebookmarks)
