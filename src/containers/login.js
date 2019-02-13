import React from 'react';
import {Form, Button, Container} from 'semantic-ui-react'


class Login  extends React.Component {
    submitTerm(pass){
       this.props.processLogin(pass)
    }

    render () {
        return (
            <Container>
            <br/><br/>
            <Form>
                  <Form.Field>
                    <label>Login</label>
                    <input placeholder='pass' ref='pass' />
                  </Form.Field>
                  <Button type='button' onClick={()=>this.submitTerm(this.refs.pass.value)}>Go</Button>
               </Form>
        </Container>
       )
    }
}


export default Login;