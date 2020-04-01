import React from 'react'
import {Table,Label,Button,Form} from 'semantic-ui-react'

function Bookmarkslist(props){
    let _category  
    _category = props.items.length > 0? props.items[0].category: ""
    
    return(
        <div className='main'>
            {_category !== undefined && // !== "" &&
                <h2>{_category}</h2>
            }
            {props.search && <h3>Total: {props.items.length}</h3>}
            <Table striped={true} compact='very' color='blue'>
            <Table.Body>
            {
                props.items.map( item => {
                    let _urlfield = 'url_'+item.id

                    if(item.editMode === undefined && props.search === undefined){
                        return(
                            <Table.Row key={item.id}>
                                <Table.Cell><a href={item.url} target='_blank' rel='noopener noreferrer'>{item.url}</a></Table.Cell>
                                <Table.Cell></Table.Cell>
                                    <Table.Cell textAlign='right'><Button icon='delete' basic color='red' onClick={()=> { if( window.confirm('Are you sure you wish to delete this bookmark?')) props.deleteBM(item.id, item.cat_id) }}/></Table.Cell>
                                    <Table.Cell textAlign='right'><Button icon='edit' basic color='blue' onClick={()=>props.editBM(item.id)}/></Table.Cell>
                            </Table.Row>
                        )
                    }
                    if(item.editMode === true){
                        return(
                            <Table.Row key={item.id}><Table.Cell><Form><Form.Field><input placeholder='URL' id={_urlfield} defaultValue={item.url} /></Form.Field></Form></Table.Cell><Table.Cell></Table.Cell>
                            <Table.Cell textAlign='right'><Button icon='write' basic color='brown' onClick={()=>props.updateBM(item.id,document.querySelector('#'+_urlfield).value,item.cat_id)}/></Table.Cell>
                            <Table.Cell textAlign='right'><Button icon='cancel' basic color='green' onClick={()=>props.cancelEdit(item.id)}/></Table.Cell>
                            <Table.Cell></Table.Cell>
                            </Table.Row>
                        )
                    }

                    if(props.search === true){
                        return(
                        <Table.Row key={item.id}>
                            <Table.Cell>
                                <a href={item.url} target='_blank' rel='noopener noreferrer'>{item.url}</a> 
                            </Table.Cell>
                            <Table.Cell textAlign='right'><Label tag size='medium' color='grey'>{props.cat.filter( f=> f.cat_id === parseInt(item.cat_id))[0].category}</Label></Table.Cell>
                        </Table.Row>
                        )
                    }
                    return null;
                })
            }
            </Table.Body>
            </Table>
        </div>
    )
}



export default Bookmarkslist
