import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function JewelleryDetail() {
    const [jewelleryModal, setJewelleryModal] = useState(false)
    const [coinModal, setCoinModal] = useState(false)
    const [selection, setSelection] = useState('1')

    const navigate = useNavigate();


    const handleCloseModal = () => setJewelleryModal(false)
    const handleShowModal = () => setJewelleryModal(true)

    const handleCloseModal1 = () => setCoinModal(false)
    const handleShowModal1 = () => setCoinModal(true)

    const onGoldSelect = (e) => {
        setSelection(e.target.value)
    }


    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Jewellery Sold:</h3>
                    <div>
                        <Card className='p-2'>
                            <Row>
                                <h3>Ear Rings</h3>
                                <p>Celebrate the mix of glossy gold and dazzling ...</p>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={80}
                                            src={image}
                                        />
                                    </Figure>
                                </Col>
                                <Col md={2}>
                                    <p>Metal:</p>
                                    <p>CAtegory:</p>
                                    <p>Purity:</p>
                                    <p>Wight:</p>
                                </Col>
                                <Col md={3}>
                                    <p>Gold</p>
                                    <p>Ear Ring</p>
                                    <p>RS. 10,000 /-</p>
                                    <p>2 gms</p>

                                </Col>
                            </Row>
                            <hr />
                            <Card className='p-2'>
                                <h3 className='text1'>Customer List:</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Phone Number</th>
                                            <th>E-mail Id</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ramu</td>
                                            <td>8765456787</td>
                                            <td>ram@gmail.com</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    onClick={() => navigate('/CustomerDetail')}
                                                    icon={faEye} className="editIcon"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Ramu</td>
                                            <td>8765456787</td>
                                            <td>ram@gmail.com</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    onClick={() => navigate('/CustomerDetail')}
                                                    icon={faEye} className="editIcon"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Ramu</td>
                                            <td>8765456787</td>
                                            <td>ram@gmail.com</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    onClick={() => navigate('/CustomerDetail')}
                                                    icon={faEye} className="editIcon"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <Modal
                show={jewelleryModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <h4 className='headertext text-center'>Add/Edit Admin Details:</h4>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Check
                                inline
                                label="Gold"
                                name="group1"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="Silver"
                                name="group1"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="Platinum"
                                name="group1"
                                type="radio"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Name"
                                    size="sm"
                                    name='Name'
                                    onChange={(e) => e.target.value}
                                    autoComplete='off'
                                    className='mb-3'
                                />
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Purity</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Purity"
                                    size="sm"
                                    name='Name'
                                    onChange={(e) => e.target.value}
                                    autoComplete='off'
                                    className='mb-3'
                                />
                                <span className="text-danger">{ }</span>
                            </Form.Group>


                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Weight"
                                    size="sm"
                                    name='Name'
                                    onChange={(e) => e.target.value}
                                    autoComplete='off'
                                    className='mb-3'
                                />
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Stores</Form.Label>
                                <div className="leftedge d-flex justify-content-space">
                                    <Form.Select
                                        aria-label="Default select example"
                                        size={"sm"}
                                        className="selectsizesmall"
                                        onChange={() => { }}
                                    >
                                        <option >Select Store</option>
                                        <option value="1">hari</option>
                                        <option value="2">gopal</option>
                                        <option value="3">mani</option>
                                        <option value="4">prema</option>
                                        <option value="5">hema</option>
                                        <option value="6">Ragu</option>
                                        <option value="7">ram</option>
                                    </Form.Select>
                                </div>
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Payment Option</Form.Label>
                                <div className="leftedge d-flex justify-content-space">
                                    <Form.Select
                                        aria-label="Default select Payment"
                                        size={"sm"}
                                        className="selectsizesmall"
                                        onChange={() => { }}
                                    >
                                        <option >Select Payment Option</option>
                                        <option value="1">Offline</option>
                                        <option value="2">Online</option>
                                    </Form.Select>
                                </div>
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label></Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Availability"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Add Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Product Image"
                                    className="w-50"
                                    name="image"
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button variant="warning">Update Image</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Add Product Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Product Video"
                                    className="w-50"
                                    name="image"
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button variant="warning">Update Video</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="warning">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div >
    )
}

export default JewelleryDetail