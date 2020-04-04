import React,{createRef, useEffect, useState} from 'react';
import {Form, Container, Message} from 'semantic-ui-react'


function Login(props) {
  let pass = createRef()
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(()=>{
    if(props.isValidLogin === 0 ){
      const timer = setTimeout( ()=>{
         setErrorMessage(true)
      },2000)
      return ()=> clearTimeout(timer)
    }
  })

  function submitTerm (pass) {
      setErrorMessage(false)
      props.processLogin(pass.current.value)
  }


  return (
    <Container>
      <br/><br/>
      {  props.isValidLogin === 0 && errorMessage === false &&
            <Message hidden={errorMessage} compact error content='Invalid Login'/>
      }
      <Form onSubmit={()=>submitTerm(pass)}>
        <Form.Field>
          <input placeholder='Code' ref={pass} type='password' autoFocus />
        </Form.Field>
      </Form>
    </Container>
  )
}


export default Login;