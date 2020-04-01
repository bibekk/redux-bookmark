import React from 'react'
import {Table,Button,Form} from 'semantic-ui-react'

class CategoryList extends React.Component{

    render(){
        const {categories} = this.props
        
        return(
            <Table size='small' compact='very' color='teal'><Table.Body>
            {
              categories.map( v => {
                  let _catfield = 'cat_'+v.cat_id
                  return ( v.editMode === undefined)?
                     <Table.Row key={v.cat_id}><Table.Cell>{v.category}</Table.Cell>
                     <Table.Cell><Button icon='delete' basic color='red' onClick={()=> { if( window.confirm('Are you sure you wish to delete this category?')) this.props.deleteCat(v.cat_id) }}/>
                        <Button icon='edit' basic color='blue' onClick={()=>this.props.editCat(v.cat_id)}/></Table.Cell>
                    </Table.Row>
                    :<Table.Row key={v.cat_id}><Table.Cell><Form><Form.Field><input defaultValue={v.category} id={_catfield} /></Form.Field></Form></Table.Cell>
                <Table.Cell><Button icon='write' basic color='brown' onClick={()=>this.props.updateCat(v.cat_id, document.querySelector('#'+_catfield).value)}/>
                    <Button icon='cancel'  basic color='green' onClick={()=>this.props.cancelCatEdit(v.cat_id)}/></Table.Cell>
                  </Table.Row>
              })
            }
            </Table.Body></Table>
        )

    }
}

export default CategoryList
