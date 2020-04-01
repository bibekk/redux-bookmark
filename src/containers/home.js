import React, { Component, createRef } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMCat} from '../actions/action-cat'
import {deleteBM,fetchBMByCat, errorAfterFiveSeconds,editBM, updateBM, cancelEdit, searchData, cleanSearch} from '../actions/action-bm'
import Categorymenu from '../components/categorymenu'
import Bookmarkslist from '../components/bookmarkslist'

import AddBookmarks from '../components/addbookmark'
import Managecat from './managecat'
import Manageterms from './manageterms'

import Search from './search'
import {Grid, Button, Input} from 'semantic-ui-react'


class Home extends Component {
   state = {openBM: false, openCat: false, openTerms: false, searchText: ''}
   searchRef = createRef()
   componentDidMount(){
       this.props.fetchBMByCat(34)
       this.props.fetchBMCat()
   }

   clearSearch = () => {
    this.setState({searchText: ''})
    this.props.cleanSearch()
    document.querySelector('input').value = ''
  }

  search  = (e,v) => {
    this.setState({searchText: v.value})
    if(v.value.length > 2){
      this.props.searchData(v.value)
    }
    if(v.value.length === 0){
      this.props.cleanSearch()
    }
  }

  render() {
      const {cat,fetchBMByCat,items, isLoading, hasErrored, search, activeCategory}  = this.props
      const {searchText} = this.state

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
          <Grid columns={3} relaxed>
            <Grid.Row>
                <Grid.Column width ={16}>
                    <Button.Group basic >
                        <Button icon='add'  onClick={()=> this.setState({openBM: true})} content='Add' />
                        <Button icon='list alternate outline' onClick={()=> this.setState({openCat: true})} content='Category'/>
                        <Button icon='clipboard list'  onClick={()=> this.setState({openTerms: true})} content='Terms'/>
                    </Button.Group>
                    &nbsp;
                    <Input icon='search' placeholder='Search Text' onChange={this.search} ref={this.searchRef}  />
                    &nbsp;
                    {searchText !== '' ?<Button basic color ='green' onClick={this.clearSearch}>Clear</Button>: null}
                </Grid.Column>
                <AddBookmarks open={this.state.openBM} close={()=>this.setState({openBM: false})} /> 
                <Managecat open={this.state.openCat} close={()=>this.setState({openCat: false})} /> 
                <Manageterms open={this.state.openTerms} close={()=>this.setState({openTerms: false})} /> 
            </Grid.Row>
            <Grid.Row >
                <Grid.Column width={2} relaxed={'true'}> <Categorymenu data ={cat} filterBlogCallback={fetchBMByCat} firsthalf={true} activeCategory={activeCategory}/></Grid.Column>
                <Grid.Column width={2} relaxed={'true'}> <Categorymenu data ={cat} filterBlogCallback={fetchBMByCat} firsthalf={false} activeCategory={activeCategory}/></Grid.Column>

                <Grid.Column width={12}>
                    { search.length === 0  &&
                        <Bookmarkslist cat={cat} items={items} deleteBM={this.props.deleteBM} editBM={this.props.editBM} updateBM={this.props.updateBM} cancelEdit={this.props.cancelEdit} />
                    }
                    {search.length > 0  &&<Search/> }
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
        activeCategory: state.activeCategory
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
            updateBM: (id,url,cat_id) => updateBM(id,url,cat_id),
            searchData: (text) => searchData(text),
            cleanSearch: cleanSearch,
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)
