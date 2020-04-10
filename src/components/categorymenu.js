import React from 'react'
import {Menu} from 'semantic-ui-react'


class Categorymenu extends React.Component{
  
    render(){ //console.log("active cat: ", this.props.activeCategory)
     const {rank} = this.props

      return (
        <Menu className={rank} vertical size='tiny'><MenuV data = {this.props.data} filterBlogCallback={this.props.filterBlogCallback} rank={rank}  activeCategory={this.props.activeCategory}/></Menu>
       // this.props.data.map(c => (
        // <li key={c.cat_id} onClick={()=>this.props.filterBlogCallback(c.cat_id)}>{c.category} ({c.total})</li>
        //))
      )
    }


}

class MenuV extends React.Component {
  state = { activeItem: 1 }

  handleItemClick = (cat_id) => {
    this.setState({ activeItem: cat_id })
    this.props.filterBlogCallback(cat_id)
  }

  render() {
  let _cat
  switch(this.props.rank){
    case 'first':  _cat = this.props.data.slice(0, Math.floor(this.props.data.length/3));break;
    case 'second': _cat = this.props.data.slice(Math.floor(this.props.data.length/3),Math.floor(this.props.data.length/3)*2); break;
    case 'third': _cat = this.props.data.slice(Math.floor(this.props.data.length/3)*2,this.props.data.length); break;
    default: _cat = this.props.data; break;
  }
   

  //let  _cat = this.props.data.slice(0, Math.floor(this.props.data.length/2));
  //console.log("active cat: ", this.props.activeCategory)
  return (
    _cat.map(c => (
       <Menu.Item key={c.cat_id} active = {c.cat_id === this.props.activeCategory} onClick={()=>this.handleItemClick(c.cat_id)}>
         {c.category}
    {/* <Label color='teal'>{c.total}</Label> */}
       </Menu.Item>
     ))
   )
  }
}

export default Categorymenu
// 30  by 3 
// 0  10 , 11.. 20 , 21 ... 30 
