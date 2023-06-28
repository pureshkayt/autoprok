import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import TruckItem from "./TruckItem";
import {Link} from "react-router-dom";
import {CARRENT_ROUTE} from "../utils/consts";


const TruckList = observer(() => {
    const { truck } = useContext(Context)

    return (
        <Row className='m-4'>
            {truck.trucks.map(truck =>
                <TruckItem key={truck.id} truck={truck}/>
            )}

        </Row>
    );
});

export default TruckList;