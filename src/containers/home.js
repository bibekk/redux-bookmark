import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMCat} from '../actions/action-cat'
import {deleteBM,fetchBMByCat, errorAfterFiveSeconds,editBM, updateBM, cancelEdit} from '../actions/action-bm'
import Categorymenu from '../components/categorymenu'
import Bookmarkslist from '../components/bookmarkslist'

class Home extends Component {

   componentDidMount(){
       this.props.fetchBMByCat(34)
       this.props.fetchBMCat()
   }

  render() {
      const {cat,fetchBMByCat,items, isLoading, hasErrored}  = this.props

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
              <Categorymenu data ={cat} filterBlogCallback={fetchBMByCat}/>
              <Bookmarkslist items={items} deleteBM={this.props.deleteBM} editBM={this.props.editBM} updateBM={this.props.updateBM} cancelEdit={this.props.cancelEdit} />
          </div>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        cat: state.categories,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchBMByCat : (cat_id) => fetchBMByCat(cat_id), //for fetching booksmarks by selected category
            fetchBMCat: fetchBMCat, //for fetching categories and count
            errorOut: errorAfterFiveSeconds,
            deleteBM: (id,cat_id) => deleteBM(id,cat_id),
            editBM: (id) => editBM(id),
            cancelEdit: (id) => cancelEdit(id),
            updateBM: (id,url,cat_id) => updateBM(id,url,cat_id)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)
