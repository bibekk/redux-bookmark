import React, { useEffect, useState } from "react"
import { Table, Button, Confirm, Pagination } from "semantic-ui-react"
const _ = require('lodash')

function TermsList(props){
  const { data, deleteTerm } = props
  const [showConfirm, setConfirm] = useState(false)
  const [deleteConfirmTerm, setDeleteConfirmTerm] = useState(null)
  const [tid, setTid] = useState(null)

  const [paging, setPaging] = useState({ defaultPage: 1, activePage: null, totalPages: null })
  const [chunked_items, setChunkedItems] = useState([])
  const PERPAGE = 20

  useEffect(()=>{
    //for paging
    const items = _.chunk(props.data, PERPAGE)
    const totalpages = _.size(items)
    setPaging({ defaultPage: 1, activePage: 1, totalPages: totalpages })
    setChunkedItems(items)
  },[])

  const onPageChange = (e, data) => {
    // setActivePage(data.activePage)
    setPaging({ activePage: data.activePage, defaultPage: paging.defaultPage, totalPages: paging.totalPages })
  }

  const _deleteTerm = () => {
    deleteTerm(tid)
    setConfirm(false)
  }

  if (data.length === 0) {
    return <div>No Data!</div>
  }
//console.log(chunked_items, chunked_items.length)
//console.log(data)

  return (
    <>

      {paging.totalPages > 1 && (
        <Pagination
          //defaultActivePage={1}
          activePage={paging.activePage}
          onPageChange={onPageChange}
          totalPages={paging.totalPages}
          firstItem={paging.totalPages > 1 ? "«" : null}
          lastItem={paging.totalPages > 1 ? "»" : null}
          nextItem={paging.totalPages > 1 ? "⟩" : null}
          prevItem={paging.totalPages > 1 ? "⟨" : null}
        />
      )}

      {chunked_items.length > 0 &&
        <Table size="small" striped compact="very" color="grey">
          <Table.Body>
            {//data.map((v) => (
              chunked_items[paging.activePage - 1].map((v) => (
                <Table.Row key={v.id}>
                  <Table.Cell>{v.term}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="mini"
                      basic
                      icon="delete"
                      color="red"
                      floated="right"
                      onClick={() => {
                        setConfirm(true)
                        setTid(v.id)
                        setDeleteConfirmTerm(v.term)
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
          ))}
          </Table.Body>
        </Table>
      }
      <Confirm
        open={showConfirm}
        content={`Are you sure you want to delete "${deleteConfirmTerm}"?`}
        onCancel={() => setConfirm(false)}
        onConfirm={_deleteTerm}
        cancelButton="Cancel"
        confirmButton="Yes"
      />
    </>
  )
}

export default TermsList
