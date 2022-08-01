import React from 'react'
import { useDispatch} from 'react-redux'
import {addTermToDB} from '../actions/action-terms'
import {Form, Button} from 'semantic-ui-react'

function AddTerm(props){
    let term = React.createRef()
    const dispatch = useDispatch()

    function submitTerm(term){
        dispatch(addTermToDB(term))
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


export default AddTerm
