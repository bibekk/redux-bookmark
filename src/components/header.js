import React from 'react'
import {Menu} from 'semantic-ui-react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setActiveMenu} from '../actions/action-bm'

class Header extends React.Component {
  state = {activeItem: this.props.activeMenu}

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
      this.props.setActiveMenu(name)
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
          setActiveMenu: setActiveMenu
        }, dispatch
    )
}



export default connect(mapStateToProps,mapDispatchToProps)(Header)
