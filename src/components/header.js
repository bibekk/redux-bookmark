import React from 'react'
import {Menu, Input} from 'semantic-ui-react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setActiveMenu, searchData, cleanSearch} from '../actions/action-bm'

class Header extends React.Component {
  state = {activeItem: this.props.activeMenu}

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
      this.props.setActiveMenu(name)
  }

  search  = (e,v) => {
    if(v.value.length > 2){
      this.props.searchData(v.value)
    }
    if(v.value.length === 0){
      this.props.cleanSearch()
    }
  }

  render() {
    const { activeItem } = this.state
    //console.log(this.props.activeMenu);
    return (
      <Menu  pointing secondary size='small'>
        <Menu.Item header>Bookmarks</Menu.Item>
        <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
        <Menu.Item name='Categories' active={activeItem === 'Categories'} onClick={this.handleItemClick} />
        <Menu.Item name='Bookmarks' active={activeItem === 'Bookmarks'} onClick={this.handleItemClick} />
        <Menu.Item name='Terms' active={activeItem === 'Terms'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' onChange={this.search} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        activeMenu: state.activeMenu,
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
          setActiveMenu: setActiveMenu,
          searchData: (text) => searchData(text),
          cleanSearch: cleanSearch,
        }, dispatch
    )
}



export default connect(mapStateToProps,mapDispatchToProps)(Header)
