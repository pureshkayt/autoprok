import React, {useContext, useEffect} from "react";
import CarList from "../components/CarList";
import {fetchBrands, fetchCars, fetchTypes} from "../http/carAPI";
import {Context} from "../index";
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import car2 from "../assets/блок1.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faCheck, faHandshake, faHeadset, faShieldAlt, faTruck} from "@fortawesome/free-solid-svg-icons";
import car1 from "../assets/Коллаж3.png";



const CarsShop = () => {
    const {car} = useContext(Context)
    useEffect(()=>{
        fetchTypes().then(data => car.setTypes(data))
        fetchBrands().then(data => car.setBrands(data))
        fetchCars(car.selectedType.id, car.selectedBrand.id, car.page, car.img, 24).then(data => {
            car.setCars(data.rows)
            car.setTotalCount(data.count)
            car.setImg(data.img);
        })
    }, [car.page, car.selectedType, car.selectedBrand, car.img])
    return (
        <Container fluid className='razd'>
            <Row className="justify-content-center align-self-center preim3">
                <h1 style={{color: "white"}}>Каталог легковых автомобилей</h1>
            </Row>
            <div className="my-4">
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={12} className='cat'>
                        <CarList/>
                        </Col>
                        <hr/>
                        <Col md={6}>
                            <h1 className="mb-5 my-4">Прокат авто в Барнауле</h1>
                            <p style={{fontSize: "1.2em"}}>
                                Добро пожаловать в <b>Avtorent22</b>!
                                <br/><br/>
                                Мы рады предложить вам широкий выбор автомобилей по доступным ценам. Наша компания специализируется на предоставлении услуг аренды автомобилей высокого качества для всех типов поездок, от коротких поездок по городу до длительных путешествий на дальние расстояния. Каждый автомобиль проходит тщательную проверку перед выдачей в аренду, чтобы гарантировать безопасность и комфортность наших клиентов во время поездки.
                                <br/><br/>
                                <i>Спасибо, что выбрали нас. Мы надеемся, что вы останетесь довольны нашими услугами и вернетесь к нам в следующий раз, когда вам понадобится арендовать автомобиль.</i>
                            </p>
                        </Col>
                        <Col md={5} className='align-self-center'>
                            <Image src={car2} width={'100%'} style={{borderRadius: "10px"}}/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Row className="justify-content-center preim">
                <h2 className="text-center mb-5 prem">Наши премущества</h2>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faHeadset} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Мы всегда на связи</Card.Title>
                            <Card.Text>
                                Наша служба поддержки работает круглосуточно, чтобы ответить на все ваши вопросы и решить проблемы.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faCar} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Большой ассортимент автомобилей</Card.Title>
                            <Card.Text>
                                У нас вы можете выбрать автомобиль из широкого ассортимента моделей и марок, чтобы удовлетворить все ваши потребности.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faCheck} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Качество полностью соответствует цене услуги</Card.Title>
                            <Card.Text>
                                Мы предлагаем высокое качество автомобилей и услуг, которое соответствует цене, которую вы платите.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faTruck} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Быстрая и качественная доставка авто</Card.Title>
                            <Card.Text>
                                Мы гарантируем быструю и качественную доставку автомобиля по месту назначения, чтобы вы могли наслаждаться своей поездкой без задержек.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faShieldAlt} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Полная гарантия на услугу</Card.Title>
                            <Card.Text>
                                Мы предоставляем полную гарантию на все наши услуги, чтобы вы могли быть уверены в качестве наших автомобилей и обслуживания.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faHandshake} size="3x" className="mb-3 mt-3 preimicon" />
                        <Card.Body>
                            <Card.Title>Мягкие условия на аренду</Card.Title>
                            <Card.Text>
                                Мы готовы предоставить вам мягкие условия на аренду автомобиля, чтобы вы могли выбрать наиболее удобный и выгодный вариант для себя.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className=" text-center rental-conditions justify-content-center prokat">
                <h2 className="text-center prem">Условия проката</h2>
                <Col md={3} className='mt-4 '>
                    <Card className="info-card info-card1">
                        <Card.Body>
                            <Card.Title><h4>Условия аренды автомобиля:</h4></Card.Title>
                            <Card.Text>
                                <ul>
                                    <li><b>Возраст водителя:</b> от 21 года</li>
                                    <li><b>Стаж вождения:</b> от 2-х лет</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className='mt-4 '>
                    <Card className="info-card info-card1">
                        <Card.Body>
                            <Card.Title><h4>Документы для аренды:</h4></Card.Title>
                            <Card.Text>
                                <ul>
                                    <li>Паспорт гражданина РФ</li>
                                    <li>Водительское удостоверение</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className='mt-4 align-self-center'>
                    <Card className="info-card info-card1">
                        <Card.Body>
                            <Card.Title>
                                <h4>
                                    Стоимость доставки:
                                </h4>
                            </Card.Title>
                            <Card.Text>
                                <ul>
                                    <li>В черте Барнаула: <b>500-1000</b> руб.</li>
                                    <li>В аэропорт Барнаула:</li>
                                    <li><b>1000</b> руб. (c 9:00 до 18:00)</li>
                                    <li><b>1500</b> руб. (c 18:00 до 9:00)</li>
                                    <li> В аэропорт Новосибирска, Горно-Алтайска: <b>6000</b> руб.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className=" text-center rental-conditions rental-conditions1 justify-content-center prokat1">
                <div className="my-5">
                    <Container>

                        <Row className='justify-content-between'>
                            <Col md={5} className='align-self-center'>
                                <Image src={car1} width={'100%'} style={{borderRadius: "10px"}}/>
                            </Col>
                            <Col md={6}>
                                <h1 className="mb-5 text-bg-danger p-2" align={'left'}>Причины для аренды</h1>
                                <p align={'left'} className='text-white p-2' style={{fontSize: "1.2em"}}>
                                    Многие интересуются: «Куда чаще всего заказывают автомобили?» Это могут быть такие мероприятия, как свадьба, День Рождения или юбилей. Также для каких-то массовых мероприятий, куда необходимо доставить людей. Можно так же заказать автомобиль для прогулки с любимой девушкой. <br/><br/>Вариантов множество, главное — <b>ваше желание</b> и наша возможность предоставить вам транспорт. У нас представлен большой автопарк, из моделей которого вы можете выбрать подходящий для себя по форме, размеру и качеству. Любая подходящая марка машины будет предложена вам в течение часа.
                                    <br/><br/>
                                    Поверьте, что цена на прокат автомобиля не оставит вас равнодушными. Выбирайте подходящее авто и делайте заказ прямо сейчас.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Row>
        </Container>
    );
}

export default CarsShop