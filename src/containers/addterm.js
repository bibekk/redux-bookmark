import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addTermToDB} from '../actions/action-terms'
import {Form, Button} from 'semantic-ui-react'

function AddTerm(props){
    let term = React.createRef()
    //const hasLoading = useSelector(state =>state.itemsIsLoading)
    function submitTerm(term){
        props.addTerm(term);
        //this.props.setActiveMenu('Categories')
    }

    return (
        <Form>
            <Form.Group>
                <Form.Field>
                    <input placeholder='Term' ref={term} autoFocus size='100' />
                </Form.Field>
                <Form.Field>
                    <Button type='submit' onClick={()=>submitTerm(term.current.value)} color='brown'>Add</Button>
                </Form.Field>
            </Form.Group>
        </Form>
    )
}


const mapStateToProps = (state) => ({
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
})


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addTerm : (term) => addTermToDB(term),
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(AddTerm)
