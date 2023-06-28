import {Col, Row, Modal, Form} from "react-bootstrap";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {fetchOneTruck} from "../http/truckAPI";
import "react-phone-input-2/lib/style.css";
import {observer} from "mobx-react-lite";
import '../styles/carpage.css'
import Button from "react-bootstrap/Button";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

const TruckPage = observer(() => {
    const [truck, setTruck] = useState({truck_info: [], truck_tariff: [], truck_img: []})
    const {id} = useParams()
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchOneTruck(id).then((data) => setTruck(data));
    }, []);

    const [selectedImage, setSelectedImage] = useState(null); // Состояние для выбранного изображения

    // ...

    // Обработчик клика на изображение
    const handleImageClick = (truck_img) => {
        const fullImageUrl = process.env.REACT_APP_API_URL + truck_img.img;
        setSelectedImage(fullImageUrl);
    };

    const handleSubmit = () => {
        const data = {
            name: name, // Имя пользователя
            phone: phone, // Телефон
            transport: truck.name
        };

        // Отправьте данные на сервер
        axios.post('http://localhost:5000/api/mailTruck', data)
            .then(response => {
                console.log(data)
            })
            .catch(error => {
                // Обработайте ошибку, если необходимо
            });
        alert("Заявка принята")
        handleClose()
    };

    return (
        <div className='devicepage1'>
            <Row className='justify-content-center devicepage '>
                <h1 className='imgh1'>{truck.name}</h1>
                <Col md={6} >
                    <Carousel showThumbs={true} showStatus={false} showIndicators={false}>
                        {truck.truck_img.slice().reverse().map(truck_img => {
                            return (
                                <div key={truck_img.id} onClick={() => handleImageClick(truck_img)}>
                                    <img src={process.env.REACT_APP_API_URL + truck_img.img} />
                                </div>
                            );
                        })}
                    </Carousel>
                </Col>
                <Col md={6}>
                    <Row className='justify-content-between'>
                <Col md={6} className='harco'>
                    <h3 className='har'>Характеристики</h3>
                    {truck.truck_info.map((truck_info, index) =>
                        <Col md={12} key={truck_info.id}>
                            <p><b>{truck_info.title}</b>: <i>{truck_info.description}</i></p>
                        </Col>
                    )}
                </Col>
                <Col md={6} className='harco'>
                    <h3 className='har'>Тарифы</h3>
                    {truck.truck_tariff.map((truck_tariff, index) =>
                        <Col md={12} key={truck_tariff.id}>
                            <p><b>{truck_tariff.title}</b>: <i>{truck_tariff.description}</i></p>
                        </Col>
                    )}
                </Col>
                        <Col md={12}><Button className='bronya btn-danger bronya1' onClick={handleShow}>Забронировать</Button></Col>
                    </Row>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} className='modalnoe'>
                <Modal.Header closeButton className='modhead'>
                    <Modal.Title>Оставьте заявку</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modbody'>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите имя"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPhone">
                                    <PhoneInput
                                        country={'ru'}
                                        value={phone}
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <br/>
                                <p>Выбранный транспорт: <b>{truck.name}</b></p>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleSubmit}
                        disabled={!name || !phone}
                    >
                        Отправить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                show={selectedImage !== null} onHide={() => setSelectedImage(null)}
            >
                <Modal.Body>
                    <img src={selectedImage} alt="Selected Image" className='scaleImg' />
                </Modal.Body>
            </Modal>
        </div>
    );
})

export default TruckPage;
