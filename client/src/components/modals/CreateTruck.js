import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {
    createTruck,
    deleteTruck,
    fetchTruckBrands,
    fetchTrucks,
    fetchTruckTypes,
    updateTruck
} from "../../http/truckAPI";
import {observer} from "mobx-react-lite";


const CreateTruck = observer( ({show, onHide}) => {
    const { truck } = useContext(Context)
    const [truck_name, setNameTruck] = useState('')
    const [truck_price, setPriceTruck] = useState(0)
    const [truck_year, setYearTruck] = useState(0)
    const [truck_img, setTruckImg] = useState([])
    const [truck_info, setTruckInfo] = useState([])
    const [truck_tariff, setTruckTariff] = useState([])
    const [truckName, setTruckName] = useState('');
    const [truckPrice, setTruckPrice] = useState(0);
    const [truckYear, setTruckYear] = useState(0);
    const [truckFile, setTruckFile] = useState([])

    useEffect(()=>{
        fetchTruckTypes().then(data => truck.setTruckTypes(data))
        fetchTruckBrands().then(data => truck.setTruckBrands(data))
        fetchTrucks(null, null, 5000, 1).then(data => {
            truck.setTrucks(data.rows)
            truck.setTruckTotalCount(data.count)
        })
    }, [])

    const addInfo = () => {
        setTruckInfo([...truck_info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setTruckInfo(truck_info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setTruckInfo(truck_info.map(i => i.number === number ? {...i, [key]:value} : i))
    }

    const addTariff = () => {
        setTruckTariff([...truck_tariff, {title: '', description: '', number: Date.now()}])
    }

    const removeTariff = (number) => {
        setTruckTariff(truck_tariff.filter(i => i.number !== number))
    }

    const changeTariff = (key, value, number) => {
        setTruckTariff(truck_tariff.map(i => i.number === number ? {...i, [key]:value} : i))
    }


    const selectFile = (e) => {
        const files = e.target.files;
        const newFiles = [];

        // преобразовываем объект FileList в массив
        for (let i = 0; i < files.length; i++) {
            newFiles.push(files[i]);
        }

        setTruckImg([...truck_img, ...newFiles]);
    }

    const selectFileDevice = (e) => {
        const files = e.target.files;
        const newFiles = [];

        // преобразуем объект FileList в массив
        for (let i = 0; i < files.length; i++) {
            newFiles.push(files[i]);
        }

        setTruckFile(newFiles);
    }



    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', truck_name)
        formData.append('price', `${truck_price}`)
        formData.append('year', `${truck_year}`)
        for (let i = 0; i < truck_img.length; i++) {
            formData.append('images', truck_img[i])
        }
        formData.append('truckBrandId', truck.selectedTruckBrand.id)
        formData.append('truckTypeId', truck.selectedTruckType.id)
        formData.append('truck_info', JSON.stringify(truck_info))
        formData.append('truck_tariff', JSON.stringify(truck_tariff))
        createTruck(formData).then(data => onHide())
    }

    const handleDelete = (id) => {
        deleteTruck(id).then(data => onHide());
    };

    const updateDev = (id) => {
        const formData = new FormData()
        formData.append('name', truckName)
        formData.append('price', `${truckPrice}`)
        formData.append('year', `${truckYear}`)
        for (let i = 0; i < truckFile.length; i++) {
            formData.append('images', truckFile[i])
        }
        updateTruck(id, formData).then((data) => onHide());
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
                        <Dropdown.Toggle>{truck.selectedTruckType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {truck.truck_types.map(truck_type =>
                                <Dropdown.Item
                                    onClick={() => truck.setTruckSelectedType(truck_type)}
                                    key={truck_type.id}
                                >
                                    {truck_type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{truck.selectedTruckBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {truck.truck_brands.map(truck_brand =>
                                <Dropdown.Item
                                    onClick={() => truck.setTruckSelectedBrand(truck_brand)}
                                    key={truck_brand.id}
                                >
                                    {truck_brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <p>Название:</p>
                    <Form.Control
                        value={truck_name}
                        onChange={e => setNameTruck(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название продукта"
                    />
                    <br/>
                    <p>Стоимость:</p>
                    <Form.Control
                        value={truck_price}
                        onChange={e => setPriceTruck(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <br/>
                    <p>Год выпуска:</p>
                    <Form.Control
                        value={truck_year}
                        onChange={e => setYearTruck(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите год выпуска"
                        type="number"/>
                    <br/>
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
                        Добавить характеристку
                    </Button>
                    {
                        truck_info.map(i =>
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
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={addTariff}
                    >
                        Добавить тариф
                    </Button>
                    {
                        truck_tariff.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4} className="p-2">
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeTariff('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md={4} className="p-2">
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeTariff('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                    />
                                </Col>
                                <Col md={4}className="p-2">
                                    <Button
                                        onClick={() => removeTariff(i.number)}
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
                <Button variant={"outline-success"} disabled={!truck_img} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать продукт
                </Modal.Title>
            </Modal.Header>
            <Row className='align-items-center justify-content-center p-3'>
                {truck.trucks.map(truck =>
                    <Col className='col-lg-auto'>
                        <Card className='align-items-center p-3 col-md-12' key={truck.id} >
                            <Row>
                                <Card.Body>
                                    <Card.Title>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    placeholder="Изменить название"
                                                    defaultValue={truck.name}
                                                    onChange={(event) => {
                                                        setTruckName(event.target.value);
                                                    }}
                                                />
                                                <Form.Control
                                                    className="mt-3"
                                                    type="file"
                                                    onChange={selectFileDevice}
                                                    multiple
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    placeholder="Изменить цену"
                                                    defaultValue={truck.price}
                                                    onChange={(event) => {
                                                        setTruckPrice(event.target.value);
                                                    }}
                                                />
                                                <Form.Control
                                                    as="textarea"
                                                    rows={1}
                                                    placeholder="Изменить год"
                                                    defaultValue={truck.year}
                                                    onChange={(event) => {
                                                        setTruckYear(event.target.value);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Card.Title>
                                    <Modal.Footer>
                                        <Button variant='outline-success' disabled={!truckFile} onClick={() =>
                                            updateDev( truck.id, {
                                                name:  truckName,
                                                price:  truckPrice,
                                                year:  truckYear,
                                                images: truckFile,
                                            })
                                        }
                                        >
                                            Принять изменения
                                        </Button>
                                        <Button variant={"outline-danger"} onClick={() => handleDelete(truck.id)}>Удалить товар</Button>
                                    </Modal.Footer>
                                </Card.Body>
                            </Row>
                        </Card>
                    </Col>
                )}
            </Row>
        </Modal>
    );
});


export default CreateTruck;