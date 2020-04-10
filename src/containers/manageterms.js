import React from 'react';
import '../App.css';
import { useSelector, useDispatch} from 'react-redux'
import AddTerm from './addterm'
import {deleteTermFromDB} from '../actions/action-terms'
import TermsList from '../components/termslist'
import {Divider, Modal, Header} from 'semantic-ui-react'

const Manageterms = (props) =>{
  //const {terms, hasErrored }  =props
  const terms = useSelector(state => state.terms)
  const hasErrored = useSelector(state => state.itemsHasErrored)
  const dispatch = useDispatch()
      
  const onClose =() => {
    props.close()
  }

  if(hasErrored){
    return (
        <p>Error!!</p>
    )
  }

  return (
    <Modal open={props.open} size='tiny' closeIcon onClose={onClose}>
    <Header icon='clipboard list'  content='Manage Terms'/>
    <Modal.Content>
      <Modal.Description>
          <AddTerm />
          <Divider />
          <TermsList data={terms} deleteTerm={(id)=>dispatch(deleteTermFromDB(id))}  />
      </Modal.Description>
    </Modal.Content>    
  </Modal>   
  );
}


export default Manageterms
