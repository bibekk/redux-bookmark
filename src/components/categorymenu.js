import React from 'react'
import {Menu,Label} from 'semantic-ui-react'


class Categorymenu extends React.Component{
      render(){
          return (
              <Menu vertical><MenuV data = {this.props.data} filterBlogCallback={this.props.filterBlogCallback} /></Menu>
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
    const { activeItem } = this.state

    return (
        this.props.data.map(c => (
           <Menu.Item key={c.cat_id} active = {activeItem === c.cat_id} onClick={()=>this.handleItemClick(c.cat_id)}>
               {c.category}
               <Label color='teal'>{c.total}</Label>
           </Menu.Item>
       ))
   )
  }
}

export default Categorymenu
