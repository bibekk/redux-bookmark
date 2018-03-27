import React from 'react'
import {Table,Label,Button} from 'semantic-ui-react'

class Bookmarkslist extends React.Component{

    render(){

        return(
                <Table striped selectable>
                   <tbody>
                   {
                      this.props.items.map( item => (
                           <tr key={item.id}><td><a href={item.url} target='_blank'>{item.url}</a></td><td><Label color='grey' tag>{item.category}</Label></td>
                           <Table.Cell><Button icon='delete' color='red' onClick={()=>this.props.deleteBM(item.id, item.cat_id)}/></Table.Cell></tr>
                       ))
                   }
                   </tbody>
                </Table>
        )

    }


}



export default Bookmarkslist
