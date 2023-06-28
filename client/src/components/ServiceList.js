import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import { fetchServices } from "../http/carAPI";

const ServiceList = observer(({ onServicesSelected }) => {
    const { car } = useContext(Context);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        fetchServices().then((data) => car.setServices(data));
    }, [car]);

    const handleServiceSelect = (index) => {
        const selectedService = car.services[index];
        const indexInSelected = selectedServices.findIndex(
            (service) => service.id === selectedService.id
        );
        if (indexInSelected !== -1) {
            setSelectedServices((prevState) =>
                prevState.filter((service) => service.id !== selectedService.id)
            );
        } else {
            setSelectedServices((prevState) => [...prevState, selectedService]);
        }
    };

    useEffect(() => {
        onServicesSelected(selectedServices);
    }, [selectedServices, onServicesSelected]);

    return (
        <Row>
            <div>
                {car.services.map((service, index) => (
                    <p key={index}>
                       {service.name}:  <b>{service.description}</b> ₽&nbsp;&nbsp;
                        <input
                            type="checkbox"
                            id={`service-${index}`}
                            className="rad"
                            onChange={() => handleServiceSelect(index)}
                            checked={selectedServices.some(
                                (selectedService) => selectedService.id === service.id
                            )}
                        />
                    </p>
                ))}
                {selectedServices.length > 0 && (
                    <p>
                        Выбранные услуги:{" "}<b>
                        {selectedServices.reduce((total, selectedService) => {
                            const cost = parseInt(selectedService.description);
                            return isNaN(cost) ? total : total + cost;
                        }, 0)}{" "}
                    </b>
                        ₽
                    </p>
                )}
            </div>
        </Row>
    );
});

export default ServiceList;
