import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {createService, deleteService, fetchServices} from "../../http/carAPI";
import {Context} from "../../index";


const CreateService = ({show, onHide}) => {
    const {car} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState(0)

    const addService = () => {
        createService({name: name, description: description}).then(data => {
            setName('')
            setDescription(0)
            onHide()
        })
    }
    const handleDelete = (id) => {
        deleteService(id).then(data => onHide());
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
                    Добавить доп. услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите название услуги"}
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(Number(e.target.value))}
                        placeholder={"Введите стоимость услуги"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} disabled={!name} onClick={addService}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Row className='align-items-center justify-content-center p-3'>
                {car.services.map(service =>
                    <Col className='col-md-auto'>
                        <Card className='align-items-center p-3' key={service.id}>
                            <div>
                                {service.name}
                            </div>
                            <div>
                                <Button variant={"danger"} onClick={() => handleDelete(service.id)}>Удалить</Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </Modal>
    );
};

export default CreateService;