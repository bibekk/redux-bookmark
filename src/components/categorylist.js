import React from 'react'
import {Table,Button,Form} from 'semantic-ui-react'

class CategoryList extends React.Component{

    render(){
        const {categories} = this.props
        return(
            <Table size='small' compact='very' color='teal'><Table.Body>
            {
              categories.map( v => {
                  return ( v.editMode === undefined)?
                     <Table.Row key={v.cat_id}><Table.Cell>{v.category}</Table.Cell><Table.Cell><Button icon='delete' color='red' onClick={()=>this.props.deleteCat(v.cat_id)}/></Table.Cell>
                        <Table.Cell><Button icon='edit' color='blue' onClick={()=>this.props.editCat(v.cat_id)}/></Table.Cell>
                    </Table.Row>
                    :<Table.Row key={v.cat_id}><Table.Cell><Form><Form.Field><input defaultValue={v.category} ref='cat' /></Form.Field></Form></Table.Cell>
                <Table.Cell><Button icon='write' color='brown' onClick={()=>this.props.updateCat(v.cat_id,this.refs.cat.value)}/></Table.Cell></Table.Row>
              })
            }
            </Table.Body></Table>
        )

    }


}


export default CategoryList
