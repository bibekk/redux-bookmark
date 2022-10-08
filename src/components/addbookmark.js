import React ,{useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addBookmark, createBookmark, bookmarksAddedSetOff} from '../actions/action-bm'
import {Form, Button, Message, Modal, Header} from 'semantic-ui-react'
//const _ = require('lodash')

const AddBookmark = props => {
 // let _cat = [],
  let _catinputnochild = []
   // _catinputwithchild = []
  let URL = React.createRef()

  const categories = useSelector((state) => state.categories)
  const added = useSelector((state) => state.bookmarksAdded)
  const active_cat = useSelector((state) => state.activeCategory)
  //const cat_heir = useSelector((state) => state.cat_heir)

  const [cat_id, setCatID] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setCatID(parseInt(active_cat))
  }, [active_cat])

  const submitBookmark = (url, cat) => {
    if (cat === null) {
      alert('Please select a category before adding bookmark.')
      return
    }
    if (url === '') {
      alert('Bookmark cannot be empty!')
      return
    }
    dispatch(addBookmark(url, cat))
    setTimeout(() => {
      dispatch(bookmarksAddedSetOff())
    }, 1000)
  }

  categories
    .forEach((v, i) => {
      // _cat.push(<option key={i} className='cat_option' value={v.cat_id}>{v.category}</option>)
      _catinputnochild.push(
        <li key={i} className={cat_id === v.cat_id ? 'active' : null} onClick={() => setCatID(v.cat_id)}>
          {v.category}
        </li>
      )
    })

    ///let _cats = _.groupBy(cat_heir,'primary_cat')
    // for(var c in _cats){
    //   _catinputwithchild.push(
    //     <li key={c}>
    //       <b>{c}</b>
    //     </li>
    //   )
    //   _cats[c].forEach((v) => {
    //     _catinputwithchild.push(
    //       <li key={v.secondary_cat_id} className={cat_id === v.secondary_cat_id ? 'active' : null} onClick={() => setCatID(v.secondary_cat_id)}>
    //         {v.secondary_cat}
    //       </li>
    //     )
    //   })
    // }
    // for(var i = 0 ; i < _cats.length; i++){
    //   console.log(_cats[i])
    // }
    // cat_heir.forEach((v,i) => {
    //   _catinput.push(
    //     <li key={`${v.primary_cat_id}-${v.secondary_cat}`} className={cat_id === v.secondary_cat_id ? 'active' : null} onClick={() => setCatID(v.secondary_cat_id)}>
    //       {v.secondary_cat}
    //     </li>
    //   )
    // })
  //      {cat_heir !== undefined && cat_heir.filter((f) => f.primary_cat_id === v.cat_id).length > 0 && <><span>+{v.category}</span></>}

  return (
    <Modal open={props.open} size="large" closeIcon onClose={props.close}>
      <Header icon="add" content="Add Bookmark" />
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group inline>
              <Form.Field>
                <input placeholder="URL" ref={URL} autoFocus size="100" />
              </Form.Field>
              <Form.Field>
                <Button type="submit" onClick={() => submitBookmark(URL.current.value, cat_id)} color="brown">
                  Add
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>

          {added === true && <Message color="blue" onDismiss={() => dispatch(createBookmark)} header="Bookmark Added Successfully" />}
          <div>
            <ul className="addbookmark_categories">{_catinputnochild}</ul>
          </div>
        
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddBookmark
