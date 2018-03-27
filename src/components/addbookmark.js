import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds, fetchBMCat, addBookmark} from '../actions/items'
import {Form, Button} from 'semantic-ui-react'

class AddBookmark  extends React.Component {
    submitBookmark(url,cat){
        this.props.addBookmark(url,cat);
    }
    render () {
        let _cat = []
        this.props.categories.forEach((v,i) => {
            _cat.push(<Form.Field key={i} label={v.category} control='input' type='radio' name='cat' value={v.cat_id}  />)
        })
        return (
            <Form>
                <Form.Group grouped>
                  <label>Select Category:</label>
                 {_cat}
               </Form.Group>
                  <Form.Field>
                    <label>Bookmark URL</label>
                    <input placeholder='URL' ref='URL' />
                  </Form.Field>

                  <Button type='submit' onClick={()=>this.submitBookmark(this.refs.URL.value, document.querySelector("input[type='radio']:checked").value)}>Submit</Button>
               </Form>
       )
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
            addBookmark: (url,cat_id) => addBookmark(url,cat_id)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)
