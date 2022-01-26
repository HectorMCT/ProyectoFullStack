import React, {Component} from "react";

import {Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';

class NavigationBar extends Component {

    render() {
        return(
            <Navbar bg="primary" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://cdn-icons-png.flaticon.com/512/75/75702.png" width="25" height="25" alt="brand" /> Rent Car
                </Link>
                <Nav className="me-auto">
                    <Link to={"rents"} className="nav-link">My Rents</Link>
                    <Link to={"profile"} className="nav-link">User </Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;