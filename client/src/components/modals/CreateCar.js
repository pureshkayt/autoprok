import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {
    createCar,
    deleteCar,
    fetchBrands,
    fetchCars, fetchServices,
    fetchTypes,
    updateCar
} from "../../http/carAPI";
import {observer} from "mobx-react-lite";


const CreateCar = observer( ({show, onHide}) => {
    const {car} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [year, setYear] = useState(0)
    const [deposit, setDeposit] = useState(0)
    const [img, setImg] = useState([])
    const [price_per_day_1_2_days, setPrice_per_day_1_2_days] = useState(0)
    const [price_per_day_3_7_days, setPrice_per_day_3_7_days] = useState(0)
    const [price_per_day_8_20_days, setPrice_per_day_8_20_days] = useState(0)
    const [price_per_day_21_days_and_more, setPrice_per_day_21_days_and_more] = useState(0)
    const [info, setInfo] = useState([])
    const [conditions, setConditions] = useState([])
    const [carName, setCarName] = useState('');
    const [carPrice, setCarPrice] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carDeposit, setCarDeposit] = useState('');
    const [carPrice_per_day_1_2_days, setCarPrice_per_day_1_2_days] = useState('');
    const [carPrice_per_day_3_7_days, setCarPrice_per_day_3_7_days] = useState('');
    const [carPrice_per_day_8_20_days, setCarPrice_per_day_8_20_days] = useState('');
    const [carPrice_per_day_21_days_and_more, setCarPrice_per_day_21_days_and_more] = useState('');
    const [carFile, setCarFile] = useState([])

    useEffect(()=>{
        fetchTypes().then(data => car.setTypes(data))
        fetchServices().then(data => car.setServices(data))
        fetchBrands().then(data => car.setBrands(data))
        fetchCars(null, null, 1, 5000).then(data => {
            car.setCars(data.rows)
            car.setTotalCount(data.count)
        })
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]:value} : i))
    }
    const addConditions = () => {
        setConditions([...conditions, {title: '', description: '', number: Date.now()}])
    }
    const removeConditions = (number) => {
        setConditions(conditions.filter(i => i.number !== number))
    }

    const changeConditions = (key, value, number) => {
        setConditions(conditions.map(i => i.number === number ? {...i, [key]:value} : i))
    }

    const selectFile = (e) => {
        const files = e.target.files;
        const newFiles = [];

        // преобразовываем объект FileList в массив
        for (let i = 0; i < files.length; i++) {
            newFiles.push(files[i]);
        }

        setImg([...img, ...newFiles]);
    }

    const selectFileDevice = (e) => {
            const files = e.target.files;
            const newFiles = [];

            // преобразуем объект FileList в массив
            for (let i = 0; i < files.length; i++) {
                newFiles.push(files[i]);
            }

        setCarFile(newFiles);
    }



    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('year', `${year}`)
        formData.append('deposit', `${deposit}`)
        formData.append('price_per_day_1_2_days', `${price_per_day_1_2_days}`)
        formData.append('price_per_day_3_7_days', `${price_per_day_3_7_days}`)
        formData.append('price_per_day_8_20_days', `${price_per_day_8_20_days}`)
        formData.append('price_per_day_21_days_and_more', `${price_per_day_21_days_and_more}`)
        for (let i = 0; i < img.length; i++) {
            formData.append('images', img[i])
        }
        formData.append('brandId', car.selectedBrand.id)
        formData.append('typeId', car.selectedType.id)
        formData.append('info', JSON.stringify(info))
        formData.append('conditions', JSON.stringify(conditions))
        createCar(formData).then(data => onHide())
    }

    const handleDelete = (id) => {
        deleteCar(id).then(data => onHide());
    };
    const updateDev = (id) => {
        const formData = new FormData()
        formData.append('name', carName)
        formData.append('price', `${carPrice}`)
        formData.append('year', `${carYear}`)
        formData.append('deposit', `${carDeposit}`)
        for (let i = 0; i < carFile.length; i++) {
            formData.append('images', carFile[i])
        }
        updateCar(id, formData).then((data) => onHide());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{car.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => car.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{car.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {car.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => car.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <p>Название:</p>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название продукта"
                    />
                    <br/>
                    <p>Стоимость:</p>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <br/>
                    <p>Год выпуска:</p>
                    <Form.Control
                        value={year}
                        onChange={e => setYear(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите год выпуска"
                        type="number"/>
                    <br/>
                    <p>Залог:</p>
                    <Form.Control
                        value={deposit}
                        onChange={e => setDeposit(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Залог"
                        type="number"
                    />
                    <br/>
                    <h4>Тарифы:</h4>
                    <br/>
                    <p>1-2 суток</p>
                    <Form.Control
                        value={price_per_day_1_2_days}
                        onChange={e => setPrice_per_day_1_2_days(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Тариф"
                        type="number"
                    />
                    <br/>
                    <p>3-7 суток</p>
                    <Form.Control
                        value={price_per_day_3_7_days}
                        onChange={e => setPrice_per_day_3_7_days(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Тариф"
                        type="number"
                    />
                    <br/>
                    <p>8-20 суток</p>
                    <Form.Control
                        value={price_per_day_8_20_days}
                        onChange={e => setPrice_per_day_8_20_days(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Тариф"
                        type="number"
                    />
                    <br/>
                    <p>21 и больше</p>
                    <Form.Control
                        value={price_per_day_21_days_and_more}
                        onChange={e => setPrice_per_day_21_days_and_more(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Тариф"
                        type="number"
                    />
                    <br/>
                    <p>Выбрать фото:</p>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                        multiple
                    />
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить характеристики
                    </Button>
                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4} className="p-2">
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md={4} className="p-2">
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                    />
                                </Col>
                                <Col md={4}className="p-2">
                                    <Button
                                        onClick={() => removeInfo(i.number)}
                                        variant={"outline-danger"}>
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} disabled={!img} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать продукт
                </Modal.Title>
            </Modal.Header>
                {car.cars.map(car =>
                    <Row className='align-items-center justify-content-center p-3'>
                        <Col className='col-lg-auto'>
                            <Card className='align-items-center p-3 col-md-12' key={car.id} >
                                <Row>
                                    <Card.Body>
                                        <Card.Title>
                                            <Form>
                                                <h4>Основная информация:</h4>
                                                <br/>
                                                <Form.Group className="mb-3">
                                                    <p>Название:</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Изменить название"
                                                        defaultValue={car.name}
                                                        onChange={(event) => {
                                                            setCarName(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>Фото:</p>
                                                    <Form.Control
                                                        className="mt-3"
                                                        type="file"
                                                        onChange={selectFileDevice}
                                                        multiple
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <p>Цена:</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Изменить цену"
                                                        defaultValue={car.price}
                                                        onChange={(event) => {
                                                            setCarPrice(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>Залог:</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Изменить залог"
                                                        defaultValue={car.deposit}
                                                        onChange={(event) => {
                                                            setCarDeposit(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>Год выпуска:</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="Изменить год"
                                                        defaultValue={car.year}
                                                        onChange={(event) => {
                                                            setCarYear(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <h4>Тарифы:</h4>
                                                    <br/>
                                                    <p>1-2 суток</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="1-2 суток"
                                                        defaultValue={car.price_per_day_1_2_days}
                                                        onChange={(event) => {
                                                            setCarPrice_per_day_1_2_days(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>3-7 суток</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="3-7 суток"
                                                        defaultValue={car.price_per_day_3_7_days}
                                                        onChange={(event) => {
                                                            setCarPrice_per_day_3_7_days(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>8-20 суток</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="8-20 суток"
                                                        defaultValue={car.price_per_day_8_20_days}
                                                        onChange={(event) => {
                                                            setCarPrice_per_day_8_20_days(event.target.value);
                                                        }}
                                                    />
                                                    <br/>
                                                    <p>21 и больше</p>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={1}
                                                        placeholder="21 и больше"
                                                        defaultValue={car.price_per_day_21_days_and_more}
                                                        onChange={(event) => {
                                                            setCarPrice_per_day_21_days_and_more(event.target.value);
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Card.Title>
                                        <Modal.Footer>
                                            <Button variant='outline-success' disabled={!carFile} onClick={() =>
                                                updateDev(car.id, {
                                                    name: carName,
                                                    price: carPrice,
                                                    year: carYear,
                                                    deposit: carDeposit,
                                                    images: carFile,
                                                })
                                            }
                                            >
                                                Принять изменения
                                            </Button>
                                            <Button variant={"outline-danger"} onClick={() => handleDelete(car.id)}>Удалить товар</Button>
                                        </Modal.Footer>
                                    </Card.Body>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    )}
        </Modal>
    );
});


export default CreateCar;