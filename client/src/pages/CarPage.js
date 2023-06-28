import {Col, Form, Modal, Row, InputGroup, Accordion} from "react-bootstrap";
import { useEffect, useState} from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useParams} from "react-router-dom"
import {fetchOneCar, fetchServices} from "../http/carAPI";
import Button from "react-bootstrap/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ServiceList from "../components/ServiceList";
import {observer} from "mobx-react-lite";
import '../styles/carpage.css'
import dogov from "../assets/dogovor.docx"
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalculator,
    faCalendarAlt,
    faCheck,
    faCirclePlus,
    faFileDownload
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


registerLocale("ru", ru);

const CarPage = observer(() => {
    const [car, setCar] = useState({info: [], conditions: [], img: []})
    const {id} = useParams()
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rentPrice, setRentPrice] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsFormValid(e.target.value !== '' && phone !== undefined);
    };

    const handlePhoneChange = (phone) => {
        setPhone(phone);
        setIsFormValid(name !== '' && phone !== undefined);
    };

    const handleDownload = () => {
        // Создаем ссылку на скачивание файла
        const downloadLink = document.createElement('a');
        downloadLink.href = dogov; // Замените путь к файлу на актуальный

        // Устанавливаем имя файла для скачивания
        downloadLink.download = 'dogovor.docx'; // Замените имя файла на актуальное

        // Эмулируем клик по ссылке для начала скачивания
        downloadLink.click();
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate < date) {
            setEndDate(date);
            setRentPrice(calculateRentPrice(date, date, car));
        } else {
            setRentPrice(calculateRentPrice(date, endDate, car));
        }
    };


    const handleEndDateChange = (date) => {
        setEndDate(date);
        setRentPrice(calculateRentPrice(startDate, date, car));
        setPricePerDay(calculatePricePerDay(startDate, date, car));
    };

    const calculateRentPrice = (start, end, car) => {
        const numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        let rentPrice;

        if (numDays >= 21) {
            rentPrice = car.price_per_day_21_days_and_more;
        } else if (numDays >= 8) {
            rentPrice = car.price_per_day_8_20_days;
        } else if (numDays >= 3) {
            rentPrice = car.price_per_day_3_7_days;
        } else {
            rentPrice = car.price_per_day_1_2_days;
        }

        return rentPrice * numDays;
    };

    const calculatePricePerDay = (start, end, car) => {
        const numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        let pricePerDay = car.price_per_day_1_2_days;

        if (numDays >= 21) {
            pricePerDay = car.price_per_day_21_days_and_more;
        } else if (numDays >= 8) {
            pricePerDay = car.price_per_day_8_20_days;
        } else if (numDays >= 3) {
            pricePerDay = car.price_per_day_3_7_days;
        }

        return pricePerDay;
    };

    const handleServicesSelected = (selectedServices) => {
        const totalPrice = selectedServices.reduce((total, selectedService) => {
            const cost = parseInt(selectedService.description);
            return isNaN(cost) ? total : total + cost;
        }, 0);
        setTotalPrice(totalPrice);
    };


    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };


    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchOneCar(id).then((data) => setCar(data));
        fetchServices().then((data) => setCar((prevCar) => ({ ...prevCar, services: data })));
    }, []);

    const [selectedImage, setSelectedImage] = useState(null); // Состояние для выбранного изображения


    // Обработчик клика на изображение
    const handleImageClick = (car) => {
        const fullImageUrl = process.env.REACT_APP_API_URL + car.img;
        setSelectedImage(fullImageUrl);
    };

    const handleSubmit = () => {
        const data = {
            name: name, // Имя пользователя
            phone: phone, // Телефон
            transport: car.name, // Выбранный транспорт
            startDate: startDate,
            endDate: endDate,
            rentalPeriod: days, // Срок аренды
            additionalServicesPrice: totalPrice, // Цена дополнительных услуг
            rentalPrice: car.deposit + pricePerDay * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) // Цена аренды
        };

        // Отправьте данные на сервер
        axios.post('http://localhost:5000/api/mail', data)
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
                <h1 className='imgh1'>{car.name}</h1>
                <Col md={7} >
                    <Carousel showArrows={true} showThumbs={true} showStatus={false} showIndicators={false}>
                        {car.img.slice().reverse().map((img) => {
                            return (
                                <div key={img.id} onClick={() => handleImageClick(img)}>
                                    <img src={process.env.REACT_APP_API_URL + img.img} alt={img.name} />
                                </div>
                            );
                        })}
                    </Carousel>
                    <Col md={12} className="harcol mt-4">
                        <Row>
                            <Col md={6}>
                        <h3 className='har'>Тарифы</h3>
                            <Col className='harcol'md={12}>
                                <label>
                                    <p>
                                        <b>1-2 суток:</b> <i>{car.price_per_day_1_2_days} ₽</i>
                                    </p>
                                </label>
                            </Col>
                            <Col className='harcol' md={12}>
                                <label>
                                    <p>
                                        <b>3-7 суток:</b> <i>{car.price_per_day_3_7_days} ₽</i>
                                    </p>
                                </label>
                            </Col>
                            <Col className='harcol' md={12}>
                                <label>
                                    <p>
                                        <b>8-20 суток:</b> <i>{car.price_per_day_8_20_days} ₽</i>
                                    </p>
                                </label>
                            </Col>
                            <Col className='harcol' md={12}>
                                <label>
                                    <p>
                                        <b>21 и больше суток:</b> <i>{car.price_per_day_21_days_and_more} ₽</i>
                                    </p>
                                </label>
                            </Col>
                            </Col>
                            <Col md={6}>
                        <h3 className='har'>Характеристики</h3>
                        {car.info.map((info, index) =>
                            <Col md={12} key={info.id}>
                                <p><b>{info.title}</b>: <i>{info.description}</i></p>
                            </Col>
                        )}
                            </Col>
                        </Row>
                    </Col>
                </Col>
                    <Col md={5} >
                        <div className="harcol1">
                            <strong><p className='har'>Калькулятор аренды</p></strong>
                        <Accordion className="acor">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Условия аренды</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Паспорт гражданина РФ, водительское удостоверение.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Возраст от 21 года.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Стаж вождения от 2 лет.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Залоговый депозит для граждан РФ составляет 3000-15000 рублей. При соблюдении условий аренды автомобиля залог возвращается.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Выдача и возврат автомобиля по предварительному бронированию осуществляется круглосуточно.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Вы получаете полностью укомплектованный, застрахованный автомобиль. Предоставляется в чистом виде и с полным баком. Просим вернуть его также чистым и заправленным. Если автомобиль возвращается грязным и/или не заправленным, Вам нужно будет оплатить компенсацию из расчета: 800-1500 руб. за мойку в зависимости от автомобиля и степени загрязнения, 55 руб/литр топлива.</li>
                                        <li><FontAwesomeIcon icon={faCheck} className='checkCond'/> Ограничение пробега 400 км в сутки. Пробег считаем суммарно за весь период аренды. При превышении лимита – оплата по 5 рублей за каждый километр свыше.</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <br/>
                        <p><i><FontAwesomeIcon icon={faCalendarAlt}/> Выберите дату аренды:</i></p>
                                <InputGroup>
                                    <Row className="justify-content-between align-items-start" >
                                        <Col>
                                            <p>От:</p>
                                        <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        locale="ru"
                                        dateFormat="dd MMMM"
                                        placeholderText="Дата начала аренды"
                                        popperModifiers={{
                                            preventOverflow: {
                                                enabled: true,
                                                escapeWithReference: false,
                                                boundariesElement: "viewport",
                                            },
                                        }}
                                        className="form-control"
                                    />
                                        </Col>
                                        <Col>
                                            <p>До:</p>
                                            <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        locale="ru"
                                        dateFormat="dd MMMM"
                                        placeholderText="Дата окончания аренды"
                                        popperModifiers={{
                                            preventOverflow: {
                                                enabled: true,
                                                escapeWithReference: false,
                                                boundariesElement: "viewport",
                                            },
                                        }}
                                        className="form-control"
                                    />
                                        </Col>
                                    </Row>
                                </InputGroup>
                                <br/>
                        <p><i><FontAwesomeIcon icon={faCirclePlus}/> Дополнительные услуги:</i></p>
                        <ServiceList onServicesSelected={handleServicesSelected} totalPrice={totalPrice} />
                        <p><i><FontAwesomeIcon icon={faCalculator} /> Итого:</i></p>
                            <p>Срок: <b>{days} сут.</b></p>
                            <p>Аренда: <b>{pricePerDay * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}</b> ₽ ({pricePerDay} ₽/сут) <br/><i>+ цена залога (<b>{car.deposit}</b> ₽)</i></p>
                                *Цена доставки договорная

                        <Button className='bronya btn-danger' onClick={handleShow} disabled={!days}>Забронировать</Button>
                        </div>
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
                                <p>Выбранный транспорт: <b>{car.name}</b></p>
                            </Col>
                            <Col md={4}>
                                <br/>
                                <p>Срок: <b>{days} сут.</b></p>
                            </Col>
                            <Col md={12}>
                                <br/>
                                <p>Дополнительные услуги: <b>{totalPrice} ₽</b></p>
                            </Col>
                            <Col md={12}>
                                <br/>
                                <p>Цена аренды: <b>{car.deposit + pricePerDay * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} ₽</b></p>
                            </Col>
                            <Col md={12}>
                                <p align={'center'} className='dogovor' onClick={handleDownload}>
                                    <FontAwesomeIcon icon={faFileDownload} /> Скачать договор
                                </p>
                                <br/>
                                <Form.Group controlId="formPhone">
                                    <p>
                                        <i>Даю согласие на обработку персональных данных</i>&nbsp;&nbsp;
                                        <input
                                            className="check"
                                            type="checkbox"
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </p>
                                </Form.Group>
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
                        disabled={!isCheckboxChecked || !name || !phone}
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

export default CarPage;
