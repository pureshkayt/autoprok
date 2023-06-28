import '../styles/admin.css';
import {Button, Container} from "react-bootstrap";
import React, {useState} from "react";
import CreateBrand from "../components/modals/CreateBrand"
import CreateCar from "../components/modals/CreateCar"
import CreateType from "../components/modals/CreateType";
import CreateService from "../components/modals/CreateService";
import CreateTruckBrand from "../components/modals/CreateTruckBrand";
import CreateTruckType from "../components/modals/CreateTruckType";
import CreateTruck from "../components/modals/CreateTruck";


function Admin() {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [serviceVisible, setServiceVisible] = useState(false)
    const [truck_brandVisible, setTruckBrandVisible] = useState(false)
    const [truck_typeVisible, setTruckTypeVisible] = useState(false)
    const [truck_deviceVisible, setTruckDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column col-md-4 adminpan">
            <h1 align='center'>Панель управления</h1>
            <br/>
            <h3>Управление легковыми автомобилями</h3>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setTypeVisible(true)}
            >
                Управление классом автомобиля
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setBrandVisible(true)}
            >
                Управление брендом автомобиля
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setServiceVisible(true)}
            >
                Управление дополнительными услугами
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setDeviceVisible(true)}
            >
                Управление легковыми автомобилями
            </Button>
            <br/>
            <h3>Управление грузовыми автомобилями</h3>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setTruckTypeVisible(true)}
            >
                Управление классом
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setTruckBrandVisible(true)}
            >
                Управление брендом
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-4 p-2"}
                onClick={() => setTruckDeviceVisible(true)}
            >
                Управление грузовыми автомобилями
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateCar show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateService show={serviceVisible} onHide={() => setServiceVisible(false)}/>
            <CreateTruckBrand show={truck_brandVisible} onHide={() => setTruckBrandVisible(false)}/>
            <CreateTruck show={truck_deviceVisible} onHide={() => setTruckDeviceVisible(false)}/>
            <CreateTruckType show={truck_typeVisible} onHide={() => setTruckTypeVisible(false)}/>
        </Container>
    );
}

export default Admin;
