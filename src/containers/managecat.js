import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds, fetchBMCat, deleteCat} from '../actions/items'
import AddCategory from './addcat'
import {Icon,Button, Table, Divider} from 'semantic-ui-react'


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
              <Table><Table.Body>
             {
                categories.map( v => (
                    <Table.Row key={v.cat_id}><Table.Cell>{v.category}</Table.Cell><Table.Cell><Button icon='delete' color='red' onClick={()=>this.props.deleteCat(v.cat_id)}/></Table.Cell></Table.Row>
                ))
             }
              </Table.Body></Table>

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
