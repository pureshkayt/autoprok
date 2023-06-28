import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import { fetchServices} from "../http/carAPI";
import CarItem from "./CarItem";
import {Link} from "react-router-dom";
import {TRUCKRENT_ROUTE} from "../utils/consts";


const CarList = observer(() => {
    const {car} = useContext(Context)
    useEffect(() => {
        fetchServices().then((data => car.setServices(data)))
    })

    return (
        <Row className='m-4'>
            {car.cars.map(car =>
                <CarItem key={car.id} car={car}/>
            )}

        </Row>
    );
});

export default CarList;