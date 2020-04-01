import React from 'react'
import { useDispatch} from 'react-redux'
import {addCat} from '../actions/action-cat'
import {Form, Button} from 'semantic-ui-react'

export const  AddCategory = props =>  {
    let cat = React.createRef()
    const dispatch = useDispatch()

    const submitCat = (cat)=>{
        dispatch(()=> dispatch(addCat(cat)))
    }

    return (
        <Form>
            <Form.Field>
                <input placeholder='Category' ref={cat} autoFocus/>
            </Form.Field>
            <Button type='submit' onClick={()=>submitCat(cat.current.value)} color='brown'>Add</Button>
        </Form>
    )
}

export default AddCategory
