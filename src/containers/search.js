import React, { Component } from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Bookmarkslist from '../components/bookmarkslist'

class Search extends Component {


  render() {
      const {search, isLoading}  = this.props

      if(isLoading){
          return(
              <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Searching...</div>
          )
      }

    /* return (
        <Table compact color='blue' className='search-class'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>URL</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {
            search.map(v => {
                return(
                    <Table.Row>
                        <Table.Cell>{v.url}</Table.Cell>
                        <Table.Cell>{v.cat_id}</Table.Cell>
                    </Table.Row>
                )
            })
            }
            </Table.Body>
        </Table>
      );*/
      return(
        <Bookmarkslist items={search} search={true}/>
      )
  }
}




const mapStateToProps = (state) => {
    return {
        search: state.search,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Search)
