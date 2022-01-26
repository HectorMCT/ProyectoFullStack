import React, {Component} from "react";

import {Col, Container, Nav, Navbar} from "react-bootstrap";

export class Footer extends Component {
    render() {
        let fullyear = new Date().getFullYear();

        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>Created by Héctor Chávez, {fullyear}</div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;