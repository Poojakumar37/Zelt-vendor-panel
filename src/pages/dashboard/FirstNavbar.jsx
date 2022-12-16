import { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import {
  AiFillAppstore,
  AiFillDatabase,
  AiOutlineRise,
  AiFillSignal,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import Contactlist from "../contact/Contactlist";
import logo from "../../assets/images/logo.png";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function FirstNavbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    toast.success('Successfully Logout')
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        delay={500}
        limit={1}
      />
      <Navbar>
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action1">Contact Us</Nav.Link> */}
            </Nav>
            <div className="d-flex" onClick={handleLogout} >
              <Button variant="outline-primary">Log Out</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default FirstNavbar;
