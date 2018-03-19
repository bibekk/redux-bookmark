import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {itemsFetchData, errorAfterFiveSeconds} from '../actions/items'

class ItemList extends Component {

   componentDidMount(){
       this.props.fetchData('http://localhost:8080/blog')
       //this.props.errorOut()
   }

/*
   fetchData(url){
       this.setState({isLoading: true})

       fetch(url).then(response =>{
           if(!response.ok){
               throw Error(response.statusText)
           }

           this.setState({isLoading: false})
           return response
       })
       .then(response => response.json())
       .then(items => this.setState({items}))
       .catch(()=> this.setState({hasErrored: true}))
   }
*/

  render() {
      if(this.props.hasErrored){
          return (
              <p>Error!!</p>
          )
      }

      if(this.props.isLoading){
          return(
              <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Loading...</div>
          )
      }

     return (
      <div className="App">
          <h2>Blog</h2>
        <ul>
        {
          this.props.items.map( item => (
                <li key={item.id}>{item.title} ({item.category})</li>
            ))
        }
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchData : (url) => itemsFetchData(url),
            errorOut: errorAfterFiveSeconds
        }, dispatch
    )


}



export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
