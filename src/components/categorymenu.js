import React from "react"
import {  Menu, Icon } from "semantic-ui-react"

class Categorymenu extends React.Component {
  render() {
    //console.log("active cat: ", this.props.activeCategory)
    const { rank } = this.props

    return (
      <Menu className={rank} vertical size="tiny" fluid>
        <MenuV
          data={this.props.data}
          cat_heir={this.props.cat_heir}
          filterBlogCallback={this.props.filterBlogCallback}
          rank={rank}
          activeCategory={this.props.activeCategory}
          updateBM={this.props.updateBM}
        />
      </Menu>
      // this.props.data.map(c => (
      // <li key={c.cat_id} onClick={()=>this.props.filterBlogCallback(c.cat_id)}>{c.category} ({c.total})</li>
      //))
    )
  }
}

class MenuV extends React.Component {
  state = { activeItem: 1, dragoverId: null }

  handleItemClick = (cat_id) => {
    this.setState({ activeItem: cat_id })
    this.props.filterBlogCallback(cat_id)
  }
  //(id, url, cat_id, category, currentcat)
  drop = (e, cat_id, category) => {
    let source = JSON.parse(e.dataTransfer.getData("item"))
    this.props.updateBM(source.id, source.url, cat_id, category, source.cat_id)
  }

  allowDrop = (e) => {
    e.preventDefault()
  }

  render() {
    const {cat_heir} = this.props
    const PART = 4
    const PER = this.props.data.length / PART

    //console.log(this.props.data,PART, PER)
    let _cat

    switch (this.props.rank) {
      case 'first':
        _cat = this.props.data.slice(0, Math.floor(PER))
        break
      case 'second':
        _cat = this.props.data.slice(Math.floor(PER), Math.floor(PER) * 2)
        break
      case 'third':
        _cat = this.props.data.slice(Math.floor(PER) * 2, Math.floor(PER) * 3)
        break
      case 'fourth':
        _cat = this.props.data.slice(Math.floor(PER) * 3, this.props.data.length)
        break
      default:
        _cat = this.props.data
        break
    }
    //let  _cat = this.props.data.slice(0, Math.floor(this.props.data.length/2));
    //console.log("active cat: ", this.props.activeCategory)
    //console.log(_cat)
    return _cat.map((c) => (
      <Menu.Item
        key={c.cat_id}
        active={c.cat_id === parseInt(this.props.activeCategory)?true: false}
        onClick={() => this.handleItemClick(c.cat_id)}
        onDrop={(e) => this.drop(e, c.cat_id, c.category)}
        onDragOver={this.allowDrop}
        // onDragEnter={() => this.setState({ dragoverId: c.cat_id })}
      >
        {cat_heir !== undefined && cat_heir.filter((f) => f.primary_cat_id === c.cat_id).length > 0 && <><span><Icon name='angle right'/>{c.category}</span>
        {/* {cat_heir.filter(f => f.primary_cat_id === c.cat_id).map(m=><Menu.Item key={m.secondary_cat_id}>{m.secondary_cat}</Menu.Item>)} */}
        </>}
        {cat_heir !== undefined && cat_heir.filter((f) => f.primary_cat_id === c.cat_id).length === 0 && <span>{c.category}</span>}
        {/*cat_heir.filter(f=>f.primary_cat_id === f.cat_id).length > 0 ? <span>test{c.category}</span>:<b>{c.category}</b>*/}
        {/* {_cat.filter((f) => f.parent_cat_id !== null && f.cat_id === c.cat_id).length } */}
      </Menu.Item>
    ))
  }
}

export default Categorymenu
// 30  by 3
// 0  10 , 11.. 20 , 21 ... 30
