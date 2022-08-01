import React from 'react'
import { useDispatch} from 'react-redux'
import {addCat} from '../actions/action-cat'
import {Form, Button} from 'semantic-ui-react'

export const  AddCategory = props =>  {
  let cat = React.createRef()
  const dispatch = useDispatch()

  const submitCat = (cat)=>{
    if(cat === ''){
      alert("Category cannot be empty!")
      return
    }
    dispatch(addCat(cat))
  }

  return (
    <Form>
      <Form.Group inline>
        <Form.Field>
          <input placeholder='Category' ref={cat} autoFocus size='100'/>
        </Form.Field>
        <Form.Field>
          <Button type='submit' onClick={()=>submitCat(cat.current.value)} color='brown'>Add</Button>
        </Form.Field>
      </Form.Group>
    </Form>
  )
}

export default AddCategory
