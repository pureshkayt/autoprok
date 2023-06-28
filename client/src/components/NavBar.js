import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import {CARRENT_ROUTE, CONTACTS_ROUTE, REVIEWS_ROUTE, TRUCKRENT_ROUTE} from "../utils/consts";
import '../styles/components/navbar.css';
import {NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faTruckFront, faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const NavBar = () => {
    const [showNav, setShowNav] = useState(false);

    const handleClick = () => {
        setShowNav(!showNav);
    };

    return (
        <Navbar bg="dark" expand="lg" className="sticky-top">
            <Container>
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle className='bg-light' onClick={handleClick} aria-controls="basic-navbar-nav">
                    {showNav ? (
                        <FontAwesomeIcon icon={faTimes} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} />
                    )}
                </Navbar.Toggle>
                <Navbar.Collapse className={showNav ? 'show' : ''} id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <NavDropdown title={'Каталог'} id="collasible-nav-dropdown" className='underline-one tog'>
                            <NavDropdown.Item href={CARRENT_ROUTE}>
                                <NavLink className='drop text-decoration-none' to={CARRENT_ROUTE}><FontAwesomeIcon icon={faCar}/>&nbsp;&nbsp;Легковые автомобили</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href={TRUCKRENT_ROUTE}>
                                <NavLink className='text-decoration-none drop' to={TRUCKRENT_ROUTE}><FontAwesomeIcon icon={faTruckFront} />&nbsp;&nbsp;Грузовые автомобили</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link><NavLink className='underline-one' to={REVIEWS_ROUTE}>Отзывы</NavLink></Nav.Link>
                        <Nav.Link><NavLink className='underline-one' to={CONTACTS_ROUTE}>Контакты</NavLink></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;