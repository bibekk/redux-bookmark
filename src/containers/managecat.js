import React from 'react';
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import {deleteCat,editCat,updateCat, cancelCatEdit} from '../actions/action-cat'
import AddCategory from './addcat'
import CategoryList from '../components/categorylist'
import {Divider, Modal} from 'semantic-ui-react'


const Managecat = (props)=> {
    const categories = useSelector(state => state.categories)
    const isLoading = useSelector(state => state.itemsIsLoading)
    const hasErrored  = useSelector(state=> state.itemsHasErrored)
    const dispatch = useDispatch()

    if(hasErrored){
        return (
            <p>Error!!</p>
        )
    }

    if(isLoading){
        return(
            <div style={{backgroundColor: '#ebebeb',padding: '5px',border: '2px solid #333'}}>Loading...</div>
        )
    }

    return (
    <Modal open={props.open} size='large' closeIcon onClose={props.close}>
        <Modal.Header>Manage Category</Modal.Header>
        <Modal.Content>
            <Modal.Description>
            <AddCategory/>
            <Divider />
            <CategoryList categories={categories} deleteCat={(id)=>dispatch(deleteCat(id))} 
                editCat= {(id)=>dispatch(editCat(id))} updateCat={(id,cat)=>dispatch(updateCat(id,cat))} 
                cancelCatEdit={(id)=>dispatch(cancelCatEdit(id))} />
            </Modal.Description>
        </Modal.Content>
    </Modal>   
    );
}

export default Managecat
