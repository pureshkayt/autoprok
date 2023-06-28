import React, { useState, useEffect } from "react";
import { Card, Col, Image } from "react-bootstrap";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CAR_ROUTE } from "../utils/consts";
import "../styles/CarItem.css"

const CarItem = ({ car }) => {
    const [isHovered, setIsHovered] = useState(false);
    const history = useHistory();
    const [slider, setSlider] = useState(null);
    const lastIndex = car.img.length - 1;

    const handleMouseEnter = () => {
        setIsHovered(true);
        slider && slider.slickNext(); // переключение на следующий слайд при наведении
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSliderLoaded = (sliderRef) => {
        setSlider(sliderRef);
    };

    useEffect(() => {
        let interval;
        if (isHovered && slider !== null) {
            interval = setInterval(() => {
                slider.slickNext();
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isHovered, slider]);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        draggable: false,
        swipe: false,
        touchMove: false,
        initialSlide: lastIndex,
    };

    return (
        <Col md={4} className={"mt-3"}>
            <Card
                className="devitem"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(CAR_ROUTE + "/" + car.id)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Slider {...settings} ref={handleSliderLoaded}>
                    {car.img.map((image) => (
                        <div key={image.id}>
                            <Image
                                src={process.env.REACT_APP_API_URL + image.img}
                                alt={image.alt}
                                fluid
                            />
                        </div>
                    ))}
                </Slider>
                <div className="nameprice">
                    <div>
                        <b>{car.name}</b>, {car.year} г.
                    </div>
                    <div>От <b>{car.price}</b> ₽/сутки</div>
                </div>
            </Card>
        </Col>
    );
};

export default CarItem;
