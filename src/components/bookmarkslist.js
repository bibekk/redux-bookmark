import React, { useState } from "react"
import { Table, Label, Button, Form, Confirm } from "semantic-ui-react"
import { useSelector } from "react-redux"
import Categorymenu from "./categorymenu"

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
  const activecategory = useSelector((state) => state.activeCategory)
  const cat_heir = useSelector((state) => state.cat_heir)

  // console.log(props.items[0].parent_cat_id)
  // console.log(categories.filter((f) => f.cat_id === parseInt(props.items[0].parent_cat_id)))

  const _deleteBookmark = () => {
    props.deleteBM(itemid, cat_id)
    setConfirm(false)
  }

  const _updateCatPre = (e, itemid) => {
    //console.log(e.target.value, itemid)
    console.log(document.querySelector(`#cat_${itemid}`).value)
    console.log(document.querySelector(`#cat_${itemid}`).selectedOptions[0].text)
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

  return (
    <div className="main">
      {_category !== undefined && <h2>{_category}</h2>}
      {props.search && <h3>Total: {props.items.length}</h3>}
      {categories.filter((f) => f.parent_cat_id === activecategory).length > 0 && (
        <Categorymenu
          data={categories.filter((f) => f.parent_cat_id === activecategory)}
          cat_heir={cat_heir}
          filterBlogCallback={props.filterBlogCallback}
          activeCategory={activecategory}
          updateBM={props.updateBM}
        />
      )}
      {props.items.length > 0 && props.items[0].parent_cat_id !== null && (
        <>
          {/* {categories.filter((f) => f.cat_id === parseInt(props.items[0].parent_cat_id))[0].category} */}
          Main Category:
          <Categorymenu
            cat_heir={cat_heir}
            data={categories.filter((f) => f.cat_id === props.items[0].parent_cat_id)}
            filterBlogCallback={props.filterBlogCallback}
            activeCategory={activecategory}
            updateBM={props.updateBM}
          />
          Sub Category:
          <Categorymenu
            cat_heir={cat_heir}
            data={categories.filter((f) => f.parent_cat_id === props.items[0].parent_cat_id)}
            filterBlogCallback={props.filterBlogCallback}
            activeCategory={activecategory}
            updateBM={props.updateBM}
          />
        </>
      )}
      <Table striped={true} compact="very" color="blue">
        <Table.Body>
          {props.items.map((item) => {
            // console.log(item)
            let _urlfield = 'url_' + item.id

            if (item.editMode === undefined && props.search === undefined) {
              return (
                <Table.Row key={item.id} draggable={true} onDragStart={(e) => dragItem(e, item.id, item.cat_id, item.url, _category)}>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell textAlign="right">
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
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button icon="cancel" basic color="green" onClick={() => props.cancelEdit(item.id)} />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
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
