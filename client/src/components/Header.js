import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/AvtoRent_logo.png'
import {MAIN_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import "../styles/header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faSquarePhone} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Header= () => {
    return (
        <div className="bg-light py-1">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="text-center text-md-start">
                        <NavLink style={{color: 'white'}} to={MAIN_ROUTE}><img height={50} src={logo} alt=""/></NavLink>
                    </Col>
                    <Col xs={12} md={4} className="text-center my-2 my-md-0">
                        <p className="mb-0"><FontAwesomeIcon icon={faMapMarkerAlt} style={{color: "red"}}/> Георгия Исакова 116 б, к 1<br/><b>с 9:00 до 18:00 без обеда и выходных</b></p>
                    </Col>
                    <Col xs={12} md={4} className="text-center text-md-end">
                        <a href="tel:+73852993388" className="text-decoration-none d-block my-1 my-md-0 tel">
                            <span className="d-block d-md-inline">+7 (3852) 99-33-88</span>
                        </a>
                        <a href="tel:+79059263388" className="text-decoration-none d-block tel">
                            <span className="d-block d-md-inline">+7 (905) 926-33-88</span>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
