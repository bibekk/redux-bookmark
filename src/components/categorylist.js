import React, { useState } from "react"
import { Table, Button, Form, Confirm } from "semantic-ui-react"

const CategoryList = (props) => {
  const { categories } = props
  const [showConfirm, setConfirm] = useState(false)
  const [catid, setCatid] = useState(null)
  const [confirmCat, setConfirmCat] = useState(null)

  return (
    <>
      <Table size="small" compact="very" color="teal">
        <Table.Body>
          {categories.map((v) => {
            let _catfield = "cat_" + v.cat_id
            return v.editMode === undefined ? (
              <Table.Row key={v.cat_id}>
                <Table.Cell>{v.category}</Table.Cell>
                <Table.Cell>
                  <Button
                    icon="delete"
                    size="mini"
                    basic
                    color="red"
                    onClick={() => {
                      setConfirm(true)
                      setCatid(v.cat_id)
                      setConfirmCat(v.category)
                    }}
                  />
                  <Button icon="edit" size="mini" basic color="blue" onClick={() => props.editCat(v.cat_id)} />
                </Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row key={v.cat_id}>
                <Table.Cell>
                  <Form>
                    <Form.Field>
                      <input defaultValue={v.category} id={_catfield} />
                    </Form.Field>
                  </Form>
                </Table.Cell>
                <Table.Cell>
                  <Button icon="write" basic color="brown" onClick={() => props.updateCat(v.cat_id, document.querySelector("#" + _catfield).value)} />
                  <Button icon="cancel" basic color="green" onClick={() => props.cancelCatEdit(v.cat_id)} />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <Confirm
        open={showConfirm}
        content={`Are you sure you want to delete "${confirmCat}"?`}
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          props.deleteCat(catid)
          setConfirm(false)
        }}
        cancelButton="Cancel"
        confirmButton="Yes"
      />
    </>
  )
}

export default CategoryList
