import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function BrochureRequest() {

    const [modalView, setModalView] = useState(false)
    const handleCloseModal = () => setModalView(false)
    const handleShowModal = () => setModalView(true)

    const navigate = useNavigate();

    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Brochure Requests:</h3>
                    <div>
                        <Card className='p-2'>
                            <Row>
                                <Col md={3}>
                                    <p style={{ margin: 10 }}>Rahul</p>
                                </Col>
                                <Col md={3}>
                                    <div style={{ margin: 10 }}><Button onClick={handleShowModal} variant="warning">Sent</Button></div>
                                    {/* <div  style={{margin:10}}><Button variant="outline-warning">Send</Button></div> */}
                                </Col>
                            </Row>
                            {/* <hr /> */}
                            <Row>
                                <Col md={3}>
                                    <p style={{ margin: 10 }}>Shreya</p>
                                </Col>
                                <Col md={3}>
                                    {/* <div  style={{margin:10}}><Button variant="warning">Sent</Button></div> */}
                                    <div style={{ margin: 10 }}><Button onClick={handleShowModal} variant="outline-warning">Send</Button></div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal
                show={modalView}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <h4 className='headertext text-center'>Accept Brochures:</h4>
                <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                {/* <p style="background-image: url(' + image + ');"></p> */}
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                            </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="warning">
                        Accept
                    </Button>
                    <Button variant="warning">
                        Accept All
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default BrochureRequest