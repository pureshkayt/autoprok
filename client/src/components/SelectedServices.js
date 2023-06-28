import React from "react";

const SelectedServices = ({ services }) => {
    return (
        <div>
            {services.length > 0 && (
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>{service.description}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectedServices;
