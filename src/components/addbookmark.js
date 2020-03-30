import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addBookmark, createBookmark, bookmarksAddedSetOff} from '../actions/action-bm'
import {Form, Button, Message, Modal} from 'semantic-ui-react'

class AddBookmark  extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cat_id: null,
            showModal: true
        }
    }

    submitBookmark(url,cat){
        this.props.addBookmark(url,cat);
        this.timer = setTimeout(()=> {this.props.bookmarksAddedSetOff()},1000)
    }
    
    handleDismiss = () => {
        this.props.createBookmark()
    }

    onClose =() => {
        this.props.close()
    }
    
    render () {
        let _cat = [], _catinput = []
       // console.log('cat_id', this.state.cat_id)
        this.props.categories.forEach((v,i) => {
            _cat.push(<option key={i} className='cat_option' value={v.cat_id}>{v.category}</option>)
           // _cat.push({key: i, text: v.category, value: v.cat_id})
           _catinput.push(<li key={i} className={ this.state.cat_id === v.cat_id? 'active': null}  onClick={()=>this.setState({cat_id: v.cat_id})}>{v.category}</li>)
        })
        return (
            <Modal open={this.props.open} size='small' closeIcon onClose={this.onClose}>
                <Modal.Header>Add Bookmark</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form >
                            <Form.Field>
                                <input placeholder='URL' ref='URL' />
                            </Form.Field>

                            <Button type='submit' onClick={()=>this.submitBookmark(this.refs.URL.value, this.state.cat_id)} color='brown'>Add</Button>
                            { this.props.added === true &&
                                <Message color='blue'
                                    onDismiss={this.handleDismiss}
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
