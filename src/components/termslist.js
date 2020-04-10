import React, {useState} from 'react'
import {Table,Button, Confirm} from 'semantic-ui-react'

const TermsList = (props) =>{
  const {data, deleteTerm} = props
  const [showConfirm, setConfirm] = useState(false)
  const [tid, setTid] = useState(null)

  const _deleteTerm =( )=>{
    deleteTerm(tid)
    setConfirm(false)
  }

  if(data.length === 0 ){
    return(
      <div>No Data!</div>
    )
  }

  return(
    <>
    <Table size='small' striped compact='very' color='grey'><Table.Body>
    {
      data.map( v => (
        <Table.Row key={v.id}>
          <Table.Cell>{v.term}</Table.Cell>
          <Table.Cell><Button basic icon='delete' color='red' onClick={()=>{setConfirm(true);setTid(v.id)}}/></Table.Cell>
        </Table.Row>
      ))
    }
    </Table.Body>
    </Table>
    <Confirm
      open={showConfirm}
      content={`Are you sure you want to delete?`}
      onCancel={()=>setConfirm(false)}
      onConfirm={_deleteTerm}
      cancelButton='Cancel'
      confirmButton='Yes'
    />
    </>
  )
}


export default TermsList
