import React, {useContext, useEffect} from "react";
import TruckList from "../components/TruckList";
import {fetchTruckBrands, fetchTrucks, fetchTruckTypes} from "../http/truckAPI";
import {Context} from "../index";
import {Card, Col, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import car2 from "../assets/коллажгруз.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeadset,
    faShieldAlt,
    faTruckFront
} from "@fortawesome/free-solid-svg-icons";

const TrucksShop = () => {
    const {truck} = useContext(Context)

    useEffect(()=>{
        fetchTruckTypes().then(data => truck.setTruckTypes(data))
        fetchTruckBrands().then(data => truck.setTruckBrands(data))
        fetchTrucks(truck.selectedTruckType.id, truck.selectedTruckBrand.id, truck.page, truck.truck_img, 24).then(data => {
            truck.setTrucks(data.rows)
            truck.setTruckTotalCount(data.count)
            truck.setTruckImg(data.truck_img);
        })
    }, [truck.page, truck.selectedTruckType, truck.selectedTruckBrand, truck.truck_img])
    return (
        <Container fluid className='razd'>
            <Row className="justify-content-center align-self-center preim2">
                <h1 style={{color: "white"}}>Услуги грузовых авто и спецтехники</h1>
            </Row>
            <div className="my-4">
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={12} className='cat'>
                            <TruckList/>
                        </Col>
                        <hr/>
                        <Col md={5} className='align-self-center'>
                            <Image src={car2} width={'100%'} style={{borderRadius: "10px"}}/>
                        </Col>
                        <Col md={6}>
                            <h1 className="mb-5 my-4" >Грузовые авто и спецтехника в Барнауле</h1>
                            <p style={{fontSize: "1.2em"}}>
                                Добро пожаловать в <b>Avtorent22</b> - вашего надежного партнера в области предоставления услуг грузовых автомобилей и спецтехники! Мы готовы предложить вам уникальные услуги, которые помогут упростить и оптимизировать ваш бизнес или личные потребности в транспорте.
                                <br/><br/>
                                <i>Выбирая <b>Avtorent22</b>, вы получаете надежного партнера, готового предложить вам широкий выбор техники высокого качества, гибкие условия аренды и профессиональную поддержку. Не сомневайтесь в своем выборе - выберите <b>Avtorent22</b> для удовлетворения ваших потребностей в грузовых автомобилях и спецтехнике.</i>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Row className="justify-content-center preim1">
                <h2 className="text-center mb-5 prem">Наши премущества</h2>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faHeadset} size="3x" className="mb-3 mt-3 preimicon preimicon1" />
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
                        <FontAwesomeIcon icon={faTruckFront} size="3x" className="mb-3 mt-3 preimicon preimicon1" />
                        <Card.Body>
                            <Card.Title>Большой ассортимент предоставляемых услуг</Card.Title>
                            <Card.Text>
                                У нас вы можете выбрать любую услугу из обширного списка, чтобы удовлетворить все ваши потребности.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="info-card">
                        <FontAwesomeIcon icon={faShieldAlt} size="3x" className="mb-3 mt-3 preimicon preimicon1" />
                        <Card.Body>
                            <Card.Title>Полная гарантия на услугу</Card.Title>
                            <Card.Text>
                                Мы гарантируем быстрое и качественное предоставление услуг
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default TrucksShop