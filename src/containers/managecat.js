import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deleteCat} from '../actions/action-cat'
import AddCategory from './addcat'
import CategoryList from '../components/categorylist'
import {Divider} from 'semantic-ui-react'


class Managecat extends Component {

   componentDidMount(){
      // this.props.fetchBMByCat(1)
      // this.props.fetchBMCat()
   }

  render() {
      const {categories, isLoading, hasErrored}  = this.props

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
              <AddCategory/>
              <Divider />
              <CategoryList categories={categories} deleteCat={this.props.deleteCat} />
          </div>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteCat : (cat_id)=> deleteCat(cat_id)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Managecat)
