import React from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import './navbar.scss';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { changeMenuVisibility } from "../../redux/actions/changemenuvisibility";

const mapStateToProps = state => {
    return { menuOpen: state.ui.mobileMenuVisibility }
};

const mapDispatchToProps = dispatch => bindActionCreators({changeMenuVisibility }, dispatch);

function CustomNav(props) {

  function toggle() {
    props.changeMenuVisibility();
  }

  
    return (
      <Navbar id="customNav" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">

        </NavbarBrand>
        <NavbarToggler color="white" onClick={toggle} />

        <Collapse
          className="justify-content-center"
          isOpen={props.menuOpen}
          navbar
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/"
                activeClassName="customNav__navLink--active"
                exact
                path="/"
              >

                Home
              </NavLink>
            </NavItem>
           
          </Nav>
        </Collapse>
      </Navbar>
    );
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNav);
