import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/contacts.css";

const Contacts = () => {
    return (
        <Container>
            <h1 className='cont'>Контакты</h1>
            <Row className='p-5'>
                <Col sm={12} md={6}>
                    <h3 className='telef'>Телефоны:</h3>
                    <p className='textcont'>
                        <a className='silka' href="tel:+73852993388">+7 (3852) 99-33-88</a>
                    </p>
                    <p className='textcont'>
                        <a className='silka' href="tel:+79059263388">+7 (905) 926-33-88</a>
                    </p>
                    <h3 className='telef'>E-mail:</h3>
                    <p className='textcont'>
                        <a className='silka' href="mailto:avtorent22@gmail.com">avtorent22@gmail.com</a>
                    </p>
                    <h3 className='telef'>Адрес:</h3>
                    <p className='textcont'>г. Барнаул, ул. Георгия Исакова 116 б, к1</p>
                    <h3 className='telef'>Режим работы:</h3>
                    <p className='textcont'>с 9:00 до 18:00 без обеда и выходных</p>
                </Col>
                <Col sm={12} md={6} className='mt-5'>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A8f5b921c513d4f5665d3744903177c4e299718c7f3757a3d80b76ea141d849de&amp;source=constructor"
                        width="100%" height="387" frameBorder="0">
                    </iframe>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
