import React, {useContext, useState} from 'react';
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {createTruckBrand, deleteTruckBrand} from "../../http/truckAPI";
import {Context} from "../../index";

const CreateTruckBrand = ({show, onHide}) => {
    const {truck} = useContext(Context)
    const [value, setValue] = useState('')

    const addBrand = () => {
        createTruckBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
    const handleDelete = (id) => {
        deleteTruckBrand(id).then(data => onHide());
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} disabled={!value} onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Row className='align-items-center justify-content-center p-3'>
                {truck.truck_brands.map(truck_brand =>
                    <Col className='col-md-auto'>
                        <Card className='align-items-center p-3' key={truck_brand.id}>
                            <div>
                                {truck_brand.name}
                            </div>
                            <div>
                                <Button variant={"danger"} onClick={() => handleDelete(truck_brand.id)}>Удалить</Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </Modal>
    );
};


export default CreateTruckBrand;