import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBMByCat, errorAfterFiveSeconds, fetchBMCat, addCat, setActiveMenu} from '../actions/items'
import {Form, Button} from 'semantic-ui-react'

class AddCategory  extends React.Component {
    submitCat(cat){
        this.props.addCat(cat);
        //this.props.setActiveMenu('Categories')
    }

    render () {
        return (
            <Form>
                  <Form.Field>
                    <label>Bookmark Category</label>
                    <input placeholder='Category' ref='cat' />
                  </Form.Field>
                  <Button type='submit' onClick={()=>this.submitCat(this.refs.cat.value)}>Add</Button>
               </Form>
       )
    }
}


const mapStateToProps = (state) => {
    return {
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addCat : (cat) => addCat(cat),
            setActiveMenu:(menu) => setActiveMenu(menu)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
