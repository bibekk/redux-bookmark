import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deleteCat} from '../actions/action-cat'
import AddTerm from './addterm'
import {fetchTermsFromDB,deleteTermFromDB} from '../actions/action-terms'
import TermsList from '../components/termslist'

import {Divider} from 'semantic-ui-react'


class Manageterms extends Component {

   componentDidMount(){
       this.props.fetchTermsFromDB()
      // this.props.fetchBMCat()
   }

  render() {
      const {terms, isLoading, hasErrored }  = this.props

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
              <AddTerm />
              <Divider />
              <TermsList data={terms} deleteTerm={this.props.deleteTermFromDB}  />
          </div>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        terms: state.terms
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteCat : (cat_id)=> deleteCat(cat_id),
            fetchTermsFromDB: ()=> fetchTermsFromDB(),
            deleteTermFromDB: (id) => deleteTermFromDB(id)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Manageterms)
