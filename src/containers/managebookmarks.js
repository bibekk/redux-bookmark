import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds, deleteBM, editBM, cancelEdit} from '../actions/action-bm'
//import Bookmarkslist from '../components/bookmarkslist'
import AddBookmark from '../components/addbookmark'

class Managebookmarks extends Component {

  render() {
      const { isLoading, hasErrored}  = this.props

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
              <AddBookmark show={true}/>
             {/* <Bookmarkslist items={items} deleteBM={this.props.deleteBM} editBM={this.props.editBM} cancelEdit={this.props.cancelEdit} />*/}
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
            deleteBM : (id,cat_id) => deleteBM(id,cat_id),
            editBM : (id) => editBM(id),
            cancelEdit: (id) => cancelEdit(id),
            errorOut: errorAfterFiveSeconds,
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Managebookmarks)
