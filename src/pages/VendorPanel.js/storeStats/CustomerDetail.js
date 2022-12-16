import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

const image = require('../../../assets/imagesCustomer/image.png');

function CustomerDetail() {
    const [jewelleryModal, setJewelleryModal] = useState(false)
    const [coinModal, setCoinModal] = useState(false)
    const [selection, setSelection] = useState('1')

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
                    <h3 className='headertext'>Customer Details:</h3>
                    <div>
                        <Card className='p-2'>
                            {/* <Row>
                                <h3>Ear Rings</h3>
                                <p>Celebrate the mix of glossy gold and dazzling ...</p>
                            </Row> */}
                            <Row>
                                {/* <Col md={2}>
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={80}
                                            src={image}
                                        />
                                    </Figure>
                                </Col> */}
                                <Col md={2}>
                                    <p>Name:</p>
                                    <p>Phone Number:</p>
                                    <p>Email:</p>
                                    <p>Address:</p>
                                </Col>
                                <Col md={3}>
                                    <p>Rahul</p>
                                    <p>+91 897652435</p>
                                    <p>rahul@gmail.com</p>
                                    <p>Cecilia Chapman
                                        711-2880 Nulla St.
                                        Mankato Mississippi 96522
                                        (257) 563-7401</p>

                                </Col>
                            </Row>
                            <hr />
                            <Card className='p-2'>
                                <h3 className='text1'>Active Schemes:</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Scheme Name</th>
                                            <th>Installment Amount</th>
                                            <th>Total Investment</th>
                                            <th>Outstanding</th>
                                            <th>Tenure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>1500 /-</td>
                                            <td>5000 /-</td>
                                            <td>9000</td>
                                            <td>12 months</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>1500 /-</td>
                                            <td>5000 /-</td>
                                            <td>9000</td>
                                            <td>12 months</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>1500 /-</td>
                                            <td>5000 /-</td>
                                            <td>9000</td>
                                            <td>12 months</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <hr />
                                <h3 className='text1'>Completed Schemes:</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Scheme Name</th>
                                            <th>Amount Investment</th>
                                            <th>Tenure</th>
                                            <th>Completed Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>12500 /-</td>
                                            <td>12 months</td>
                                            <td>12/10/2020</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>12500 /-</td>
                                            <td>12 months</td>
                                            <td>12/10/2020</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Gold Harvest (11+1)</td>
                                            <td>12500 /-</td>
                                            <td>12 months</td>
                                            <td>12/10/2020</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <hr />
                                <h3 className='text1'>Jewellery Purchased:</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Jewellery Name</th>
                                            <th>Jewellery Image</th>
                                            <th>Price</th>
                                            <th>Weight</th>
                                            <th>Purity</th>
                                            <th>Purchased Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Ear ring</td>
                                            <td>
                                                <Figure>
                                                    <Figure.Image
                                                        width={100}
                                                        height={80}
                                                        src={image}
                                                    />
                                                </Figure>
                                            </td>
                                            <td>20,000 /-</td>
                                            <td>5 gms</td>
                                            <td>24</td>
                                            <td>12/10/2020</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Ear ring</td>
                                            <td>
                                                <Figure>
                                                    <Figure.Image
                                                        width={100}
                                                        height={80}
                                                        src={image}
                                                    />
                                                </Figure>
                                            </td>
                                            <td>20,000 /-</td>
                                            <td>5 gms</td>
                                            <td>24</td>
                                            <td>12/10/2020</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Ear ring</td>
                                            <td>
                                                <Figure>
                                                    <Figure.Image
                                                        width={100}
                                                        height={80}
                                                        src={image}
                                                    />
                                                </Figure>
                                            </td>
                                            <td>20,000 /-</td>
                                            <td>5 gms</td>
                                            <td>24</td>
                                            <td>12/10/2020</td>
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

export default CustomerDetail