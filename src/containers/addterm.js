import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addTermToDB} from '../actions/action-terms'
import {Form, Button} from 'semantic-ui-react'

class AddTerm  extends React.Component {
    submitTerm(term){
        this.props.addTerm(term);
        //this.props.setActiveMenu('Categories')
    }

    render () {
        return (
            <Form>
                  <Form.Field>
                    <label>Bookmark Term</label>
                    <input placeholder='Term' ref='term' />
                  </Form.Field>
                  <Button type='submit' onClick={()=>this.submitTerm(this.refs.term.value)}>Add</Button>
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
            addTerm : (term) => addTermToDB(term),
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(AddTerm)
