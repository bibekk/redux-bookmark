import React from 'react'
import {Table,Button} from 'semantic-ui-react'

class TermsList extends React.Component{

    render(){
        const {data} = this.props
        if(data.length === 0 ){
            return(
                <div>No Data!</div>
            )
        }
        return(
            <>
            <Table size='small' compact='very' color='grey'><Table.Body>
            {
              data.map( v => (
                  <Table.Row key={v.id}>
                      <Table.Cell>{v.term}</Table.Cell>
                      <Table.Cell><Button icon='delete' color='red' onClick={()=> { if( window.confirm('Are you sure you wish to delete this term?')) this.props.deleteTerm(v.id) }}/></Table.Cell></Table.Row>
              ))
            }
            </Table.Body></Table>
                </>
        )

    }


}


export default TermsList
