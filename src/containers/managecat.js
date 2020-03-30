import React from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deleteCat,editCat,updateCat, cancelCatEdit} from '../actions/action-cat'
import AddCategory from './addcat'
import CategoryList from '../components/categorylist'
import {Divider, Modal} from 'semantic-ui-react'


function Managecat(props) {
   function onClose(){
        props.close()
   }

    const {categories, isLoading, hasErrored}  = props

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
    <Modal open={props.open} size='large' closeIcon onClose={onClose}>
        <Modal.Header>Manage Category</Modal.Header>
        <Modal.Content>
            <Modal.Description>
            <AddCategory/>
            <Divider />
            <CategoryList categories={categories} deleteCat={props.deleteCat} editCat= {props.editCat} updateCat={props.updateCat} cancelCatEdit={props.cancelCatEdit} />
            </Modal.Description>
        </Modal.Content>
    </Modal>   
    );
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteCat : (cat_id)=> deleteCat(cat_id),
            editCat: (cat_id) => editCat(cat_id),
            updateCat: (cat_id,category) => updateCat(cat_id,category),
            cancelCatEdit: (cat_id) => cancelCatEdit(cat_id)
        }, dispatch
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(Managecat)
