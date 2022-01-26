import './App.css';
import React from "react";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import Rents from "./components/Rents";
import User from "./components/User";
import {Col, Row} from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <NavigationBar/>
            <Row>
                <Col>
                    <Routes>
                        <Route path="/" exact element={<Reservation/>}/>
                        <Route path="/rents" exact element={<Rents/>}/>
                        <Route path="/profile" exact element={<User/>}/>
                    </Routes >
                </Col>
            </Row>
            <Footer/>
        </Router>
    );
}
