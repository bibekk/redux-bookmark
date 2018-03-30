import React from 'react'
import {Table,Button} from 'semantic-ui-react'

class CategoryList extends React.Component{

    render(){
        const {categories} = this.props
        return(
            <Table size='small' compact='very' color='teal'><Table.Body>
            {
              categories.map( v => (
                  <Table.Row key={v.cat_id}><Table.Cell>{v.category}</Table.Cell><Table.Cell><Button icon='delete' color='red' onClick={()=>this.props.deleteCat(v.cat_id)}/></Table.Cell></Table.Row>
              ))
            }
            </Table.Body></Table>
        )

    }


}


export default CategoryList
