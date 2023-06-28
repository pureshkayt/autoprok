import React, {useContext, useState} from 'react';
import {Button, Card, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {createTruckType, deleteTruckType} from "../../http/truckAPI";
import {Context} from "../../index";


const CreateTruckType = ({show, onHide}) => {
    const {truck} = useContext(Context)
    const [value, setValue] = useState('')

    const addType = () => {
        createTruckType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
    const handleDelete = (id) => {
        deleteTruckType(id).then(data => onHide());
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} disabled={!value} onClick={addType}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Row className='align-items-center justify-content-center p-3'>
                {truck.truck_types.map(truck_type =>
                    <Col className='col-md-auto'>
                        <Card className='align-items-center p-3' key={truck_type.id}>
                            <div>
                                {truck_type.name}
                            </div>
                            <div>
                                <Button variant={"danger"} onClick={() => handleDelete(truck_type.id)}>Удалить</Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </Modal>
    );
};

export default CreateTruckType;