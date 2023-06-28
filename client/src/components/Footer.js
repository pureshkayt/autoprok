import React from "react";
import {Container, Row, Col, Nav, NavItem, NavLink, Image} from 'react-bootstrap';
import '../styles/components/footer.css';
import {CARRENT_ROUTE, REVIEWS_ROUTE, TRUCKRENT_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";
import {faEnvelope, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Footer() {
    return (
        <div className="footer">
            <Container fluid>
                <Row className="footer1">
                    <Col lg={4} className="my-3">
                        <h4 className="footer__title">Каталог</h4>
                        <Nav className="flex-column">
                            <NavItem>
                                <Link className="footer__link" to={CARRENT_ROUTE}>
                                    Легковые автомобили
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="footer__link" to={TRUCKRENT_ROUTE}>
                                    Грузовые автомобили
                                </Link>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col lg={4} className="my-3">
                        <h4 className="footer__title">Отзывы</h4>
                        <Nav className="flex-column">
                            <NavItem>
                                <Link className="footer__link" to={REVIEWS_ROUTE}>
                                    Смотреть все отзывы
                                </Link>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col lg={4} className="my-3">
                        <h4 className="footer__title">Контакты</h4>
                        <p className="footer__text">
                            <b>Адрес:</b> г. Барнаул, Георгия Исакова 116 б, к. 1
                        </p>
                        <p className="footer__text"><b>Телефоны:</b> +7 (3852) 99-33-88,<br/> +7 (905) 926-33-88</p>
                        <p className="footer__text"><b>Email:</b> avtorent22@gmail.com</p>
                    </Col>
                </Row>
                <hr style={{color: "white"}}/>
                <Row>
                    <Col>
                        <p className="footer__text">© 2023 Все права защищены: avtorent22.ru</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;