import React from "react";
import {Col, Container,} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import '../styles/Main.css'
import {CARRENT_ROUTE, TRUCKRENT_ROUTE} from "../utils/consts";
import {Link} from "react-router-dom";

const Main = () => {

    return (
        <Container fluid className='razd'>
            <Row style={{
                height: '100vh',
            }}>
                <Col xs={12} md={12} className='legkovaya'>
                    <Link to={CARRENT_ROUTE} style={{ textDecoration: 'none' }}>
                        <div className='razd1'>
                            <h1 className='razdtext'>Прокат легковых<br/> автомобилей<br/> ← </h1>
                        </div>
                    </Link>
                </Col>
                <Col xs={12} md={12} className="p-0">
                    <Link to={TRUCKRENT_ROUTE} style={{ textDecoration: 'none' }}>
                    <div className="razd2">
                        <h1 className='razdtext' align='right'>Услуги грузовых авто<br/>и спецтехники<br/>→</h1>
                    </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Main