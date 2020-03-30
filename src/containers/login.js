import React,{createRef} from 'react';
import {Form, Button, Container} from 'semantic-ui-react'


function Login(props) {
  let pass = createRef()

  function submitTerm (pass) {
      props.processLogin(pass.current.value)
  }

  return (
    <Container>
      <br/><br/>
      <Form onSubmit={()=>submitTerm(pass)}>
        <Form.Field>
          <input placeholder='Code' ref={pass} type='password' />
        </Form.Field>
        <Button type='submit'>Go</Button>
      </Form>
    </Container>
  )
}


export default Login;