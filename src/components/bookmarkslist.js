import React from 'react'
import {Table,Label,Button,Form} from 'semantic-ui-react'

class Bookmarkslist extends React.Component{

    render(){
        return(
            <Table striped selectable compact='very' color='blue'>
               <tbody>
               {
                  this.props.items.map( item => {
                      let _urlfield = 'url_'+item.id

                       return (item.editMode === undefined)?
                       <tr key={item.id}><td><a href={item.url} target='_blank'>{item.url}</a></td><td><Label color='grey' tag>{item.category}</Label></td>
                       <Table.Cell><Button icon='delete' color='red' onClick={()=>this.props.deleteBM(item.id, item.cat_id)}/></Table.Cell>
                       <Table.Cell><Button icon='edit' color='blue' onClick={()=>this.props.editBM(item.id)}/></Table.Cell>
                       </tr>:
                       <tr key={item.id}><td><Form><Form.Field><input placeholder='URL' id={_urlfield} defaultValue={item.url} /></Form.Field></Form></td><td><Label color='grey' tag>{item.category}</Label></td>
                       <Table.Cell><Button icon='write' color='brown' onClick={()=>this.props.updateBM(item.id,document.querySelector('#'+_urlfield).value,item.cat_id)}/></Table.Cell>
                       <Table.Cell><Button icon='cancel' color='green' onClick={()=>this.props.cancelEdit(item.id)}/></Table.Cell>
                       <Table.Cell></Table.Cell>
                       </tr>
                   })
               }
               </tbody>
            </Table>
        )

    }


}



export default Bookmarkslist
