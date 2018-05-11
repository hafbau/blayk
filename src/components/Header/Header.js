import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';

import Avatar from '../Avatar';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  handleLogout() {
    this.props.logout(this.props.token)
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarBrand href="/"></NavbarBrand>

        <Nav className="navbar-nav">
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <Avatar
                  size={35}
                  src={this.props.user.avatar}
                  name={this.props.user.name}
                />
                <span className="d-md-down-none">{this.props.user.firstName}</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

                <DropdownItem tag="a" href='/profile'><i className="fa fa-user"></i>Profile</DropdownItem>
                <DropdownItem tag={Link} to={{pathname: '/profile', state: { tab: '2'}}}><i className="fa fa-wrench"></i>Settings</DropdownItem>
                <DropdownItem><i className="fa fa-file"></i>Test Suites<Badge color="primary">42</Badge></DropdownItem>
                <DropdownItem onClick={(e) => this.handleLogout(e)}><i className="fa fa-lock"></i>Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    )
  }
}

export default Header;
