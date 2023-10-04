import React, { useState, useEffect } from "react"
import { Table, Label, Button, Form, Confirm, Pagination, Message, Icon } from "semantic-ui-react"
import { useSelector } from "react-redux"

const _ = require('lodash')
//import Categorymenu from "./categorymenu"

function Bookmarkslist(props) {
  let _category
  _category = props.items.length > 0 ? props.items[0].category : ""
  let _cat = []
  const [showConfirm, setConfirm] = useState(false)
  const [itemid, setItemID] = useState(null)
  const [cat_id, setCatID] = useState(null)
  const [bmtitle, setBmtitle] = useState(null)
  // const [updatecat, setUpdateCat] = useState([])
  const categories = useSelector((state) => state.categories)
  //const activecategory = useSelector((state) => state.activeCategory)
  //const cat_heir = useSelector((state) => state.cat_heir)

  // console.log(props.items[0].parent_cat_id)
  // console.log(categories.filter((f) => f.cat_id === parseInt(props.items[0].parent_cat_id)))

   //paging
  const [paging, setPaging] = useState({ defaultPage: 1, activePage: null, totalPages: null })
  const [chunked_items, setChunkedItems] = useState([])
  const PERPAGE = 20

  useEffect(()=> {
 //for paging
    const items = _.chunk(props.items, PERPAGE)
    const totalpages = _.size(items)
    setPaging({ defaultPage: 1, activePage: 1, totalPages: totalpages })
    setChunkedItems(items)
  },[props.items, props.activeCategory])

  const _deleteBookmark = () => {
    props.deleteBM(itemid, cat_id)
    setConfirm(false)
  }

  const _updateCatPre = (e, itemid) => {
    //console.log(e.target.value, itemid)
    //console.log(document.querySelector(`#cat_${itemid}`).value)
    //console.log(document.querySelector(`#cat_${itemid}`).selectedOptions[0].text)
  }

  const onPageChange = (e, data) => {
    // setActivePage(data.activePage)
    setPaging({ activePage: data.activePage, defaultPage: paging.defaultPage, totalPages: paging.totalPages })
  }

  const dragItem = (e, id, cat, url, category) => {
    // console.log(id, cat)
    e.dataTransfer.setData("item", JSON.stringify({ id: id, cat_id: cat, url: url, category: category }))
  }

  categories.forEach((v, i) => {
    _cat.push(
      <option key={i} className="cat_option" value={v.cat_id}>
        {v.category}
      </option>
    )
  })

  if (_.size(chunked_items) === 0) {
    return (
      <Message warning style={{ marginLeft: "25px" }}>
        <Message.Header>No items found for this category.</Message.Header>
      </Message>
    )
  }

  return (
    <div className="main">
      {_category !== undefined && <h2 className="subcat"><Icon name='sticky note' size='small'  />{_category}</h2>}
      {props.search && <h3>Total: {props.items.length}</h3>}

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

      <Table striped={true} compact="very">
        <Table.Body>
          {//props.items.map((item) => {
            chunked_items[paging.activePage - 1].map((item) => {
            // console.log(item)
            let _urlfield = 'url_' + item.id

            if (item.editMode === undefined && props.search === undefined) {
              return (
                <Table.Row key={item.id} draggable={true} onDragStart={(e) => dragItem(e, item.id, item.cat_id, item.url, _category)}>
                  <Table.Cell>
                    {item.pin !== null ? <Button icon='pin' size='mini' color='blue' circular   onClick={()=>props.pinBM(item.id,categories.filter((f) => f.category === _category)[0].cat_id,null)}></Button>:<Button icon='pin'  size='mini' color='brown' basic circular onClick={()=>props.pinBM(item.id,categories.filter((f) => f.category === _category)[0].cat_id,'1')} />}
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button
                      icon="delete"
                      size="mini"
                      as="div"
                      basic
                      color="red"
                      onClick={() => {
                        setConfirm(true)
                        setItemID(item.id)
                        setCatID(item.cat_id)
                        setBmtitle(item.url)
                      }}
                    />
                    <Button icon="edit" size="mini" basic color="blue" onClick={() => props.editBM(item.id)} />
                  </Table.Cell>
                </Table.Row>
              )
            }
            if (item.editMode === true) {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Form>
                      <Form.Field>
                        <input placeholder="URL" id={_urlfield} defaultValue={item.url} />
                      </Form.Field>
                    </Form>
                  </Table.Cell>
                  <Table.Cell>
                    <select className="bookmark-option" id={`cat_${item.id}`} defaultValue={item.cat_id} onChange={(e) => _updateCatPre(e, item.id)}>
                      {_cat}
                    </select>
                  </Table.Cell>

                  <Table.Cell textAlign="right">
                    <Button
                      icon="write"
                      basic
                      size='mini'
                      color="brown"
                      onClick={() => {
                        props.updateBM(
                          item.id,
                          document.querySelector('#' + _urlfield).value,
                          document.querySelector(`#cat_${item.id}`).value,
                          document.querySelector(`#cat_${item.id}`).selectedOptions[0].text,
                          categories.filter((f) => f.category === _category)[0].cat_id
                        )
                      }}
                    />
                    <Button icon="cancel" size='mini' basic color="green" onClick={() => props.cancelEdit(item.id)} />
                  </Table.Cell>
                </Table.Row>
              )
            }

            if (props.search === true) {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Label tag size="medium" color="grey">
                      {props.cat.filter((f) => f.cat_id === parseInt(item.cat_id))[0].category}
                    </Label>
                  </Table.Cell>
                </Table.Row>
              )
            }
            return null
          })}
        </Table.Body>
      </Table>
      <Confirm
        open={showConfirm}
        content={`Are you sure you want to delete "${bmtitle}"?`}
        onCancel={() => setConfirm(false)}
        onConfirm={_deleteBookmark}
        cancelButton="Cancel"
        confirmButton="Yes"
      />
    </div>
  )
}

export default Bookmarkslist
