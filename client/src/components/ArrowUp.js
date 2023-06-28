import { Button } from 'react-bootstrap';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button
            variant="light"
            className={`scroll-to-top-button ${showButton ? 'show' : 'hide'}`}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </Button>
    );
}

export default ScrollToTopButton
