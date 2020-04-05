import React ,{useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addBookmark, createBookmark, bookmarksAddedSetOff} from '../actions/action-bm'
import {Form, Button, Message, Modal, Header} from 'semantic-ui-react'

function AddBookmark(props){
    const [cat_id,setCatID] = useState(null)
    let _cat = [], _catinput = []
    let URL = React.createRef()

    function submitBookmark(url,cat){
        props.addBookmark(url,cat);
        setTimeout(()=> {props.bookmarksAddedSetOff()},1000)
    }

    // console.log('cat_id', this.state.cat_id)
    props.categories.forEach((v,i) => {
        _cat.push(<option key={i} className='cat_option' value={v.cat_id}>{v.category}</option>)
        // _cat.push({key: i, text: v.category, value: v.cat_id})
        _catinput.push(<li key={i} className={ cat_id === v.cat_id? 'active': null}  onClick={()=>setCatID(v.cat_id)}>{v.category}</li>)
    })
    
    return (
        <Modal open={props.open} size='small' closeIcon onClose={props.close}>
            <Header icon='add' content='Add Bookmark'/>
            <Modal.Content>
                <Modal.Description>
                    <Form >
                        <Form.Field>
                            <input placeholder='URL' ref={URL} autoFocus />
                        </Form.Field>

                        <Button type='submit' onClick={()=>submitBookmark(URL.current.value, cat_id)} color='brown'>Add</Button>
                        { props.added === true &&
                            <Message color='blue'
                                onDismiss={props.createBookmark}
                                header='Bookmark Added Successfully'
                            />                     
                        }
                        <ul className='addbookmark_categories'>
                        {_catinput}
                        </ul>             
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>   
    )
}


const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        added: state.bookmarksAdded
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addBookmark: (url,cat_id) => addBookmark(url,cat_id),
            createBookmark: ()=> createBookmark(),
            bookmarksAddedSetOff: ()=> bookmarksAddedSetOff()
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)
