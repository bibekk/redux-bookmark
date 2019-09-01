import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMCat} from '../actions/action-cat'
import {deleteBM,fetchBMByCat, errorAfterFiveSeconds,editBM, updateBM, cancelEdit} from '../actions/action-bm'
import Categorymenu from '../components/categorymenu'
import Bookmarkslist from '../components/bookmarkslist'
import Search from './search'

import {Grid} from 'semantic-ui-react'



class Home extends Component {

   componentDidMount(){
       this.props.fetchBMByCat(34)
       this.props.fetchBMCat()
   }

  render() {
      const {cat,fetchBMByCat,items, isLoading, hasErrored, search}  = this.props

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
          <Grid columns={2} >
            <Grid.Row>
                 <Grid.Column width={3}> <Categorymenu data ={cat} filterBlogCallback={fetchBMByCat}/></Grid.Column>
                <Grid.Column width={13}>
                    { search.length === 0  &&
                        <Bookmarkslist items={items} deleteBM={this.props.deleteBM} editBM={this.props.editBM} updateBM={this.props.updateBM} cancelEdit={this.props.cancelEdit} />
                    }
                    <Search/>
               </Grid.Column>
            </Grid.Row>
          </Grid>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        search: state.search,
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
