import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addBookmark, createBookmark, bookmarksAddedSetOff} from '../actions/action-bm'
import {Form, Button, Message} from 'semantic-ui-react'

class AddBookmark  extends React.Component {
    submitBookmark(url,cat){
        this.props.addBookmark(url,cat);
        this.timer = setTimeout(()=> {this.props.bookmarksAddedSetOff()},1000)
    }
    
    handleDismiss = () => {
        this.props.createBookmark()
    }
    
    render () {
        let _cat = []
        this.props.categories.forEach((v,i) => {
            _cat.push(<option key={i} value={v.cat_id}>{v.category}</option>)
        })
        return (
            <Form size='large'>
                  <Form.Field>
                    <label>Bookmark URL</label>
                    <input placeholder='URL' ref='URL' />
                  </Form.Field>

                  <Button type='submit' onClick={()=>this.submitBookmark(this.refs.URL.value, document.querySelector("select").value)}>Submit</Button>
                { this.props.added === true &&
                    <Message color='blue'
                        onDismiss={this.handleDismiss}
                        header='Bookmark Added Successfully'
                    />                     
                }
                                      
                <Form.Group grouped>
                 <label>Select Category:</label>
                 <Form.Select name='cat' control='select' size={this.props.categories.length}>
                     {_cat}
                 </Form.Select>
               </Form.Group>
             
            </Form>
       )
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        added: state.bookmarksAdded
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addBookmark: (url,cat_id) => addBookmark(url,cat_id),
            createBookmark: ()=> createBookmark(),
            bookmarksAddedSetOff: ()=> bookmarksAddedSetOff()
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)
