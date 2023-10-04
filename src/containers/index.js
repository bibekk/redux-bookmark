import React from 'react';
import '../App.css';
import { useDispatch, useSelector} from 'react-redux'
import {matchPass} from '../actions/action-terms'
import {ENV} from '../actions'
import Home from './home'
import AddBookmarks from '../components/addbookmark'
import Manageterms from './manageterms'
import Managecat from './managecat'
import {Container, Icon, Message} from 'semantic-ui-react'
import Login from './login'


function App(props){
  let _activeComp
  const activeMenu = useSelector(state=> state.activeMenu)
  const hasErrored = useSelector(state=>state.itemsHasErrored)
  const isValidLogin =  useSelector(state=>state.isValidLogin)
  const dispatch = useDispatch()

  const processLogin  = (pass)=> {
    dispatch(matchPass(pass))
  }

  if(hasErrored){
    return (
      <Message error>Unexpected Error!!</Message>
    )
  }
  
  if(ENV !== 'uat'){
    if(isValidLogin === 0 || isValidLogin === null){
      return <Login processLogin = {(pass) => processLogin(pass)} isValidLogin={isValidLogin} />
    }
  }

  if(isValidLogin === 0){
    return (
      <Login processLogin = {(pass) => processLogin(pass)} />
    )
  }

  /*if(isLoading){
    return(
      <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Loading...</div>
    )
  }*/

  


  switch(activeMenu) {
    case 'Home': _activeComp = <Home/>; break;
    case 'Categories': _activeComp = <Managecat/>;break;
    case 'Bookmarks': _activeComp = <AddBookmarks />;break;
    case 'Terms': _activeComp = <Manageterms />; break;
    default: _activeComp =  <Home/>
  }

  return (
    <Container fluid className='main'>
      <h2><Icon name='bookmark' size='small' ></Icon>Bookmarks</h2>
      {_activeComp}
    </Container>
  );
}


export {
  App
} 
