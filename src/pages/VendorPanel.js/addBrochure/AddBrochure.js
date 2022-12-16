import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const image = require('../../../assets/imagesCustomer/image.png');

function AddBrochure() {
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
                    <h3 className='headertext'>Brochures</h3>
                    <div>
                        <Card className='p-2'>
                            <Row>
                                <Col md={4}>
                                    <h3 className='headertext'>Manage Brochures:</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Button variant="warning" onClick={handleShowModal}>Upload new Brochures:</Button>
                                </Col>
                            </Row>
                            <hr />
                            <Card className='p-2'>
                                <h3 className='text1'>Available Brochures:</h3>
                                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                                    <div onClick={handleShowModal1} style={{ width: 200, height: 250, border: '1px solid', margin:10 }}>

                                    </div>
                                    <div style={{ width: 200, height: 250, border: '1px solid', margin:10 }}>

                                    </div>
                                    <div style={{ width: 200, height: 250, border: '1px solid', margin:10 }}>

                                    </div>
                                    <div style={{ width: 200, height: 250, border: '1px solid', margin:10 }}>

                                    </div>
                                    <div style={{ width: 200, height: 250, border: '1px solid', margin:10 }}>

                                    </div>
                                </div>
                                {/* <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Jewellery Name</th>
                      <th>Jewellery Image</th>
                      <th>Price</th>
                      <th>weight</th>
                      <th>category</th>
                      <th>metal</th>
                      <th>purity</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ring</td>
                      <td>
                        <Figure>
                          <Figure.Image
                            width={100}
                            height={80}
                            src={image}
                          />
                        </Figure>
                      </td>
                      <td>RS. 15,000 /-</td>
                      <td>3 gms</td>
                      <td>ring</td>
                      <td>gold</td>
                      <td>24</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Ring</td>
                      <td>
                        <Figure>
                          <Figure.Image
                            width={100}
                            height={80}
                            src={image}
                          />
                        </Figure>
                      </td>
                      <td>RS. 15,000 /-</td>
                      <td>3 gms</td>
                      <td>ring</td>
                      <td>gold</td>
                      <td>24</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Ring</td>
                      <td>
                        <Figure>
                          <Figure.Image
                            width={100}
                            height={80}
                            src={image}
                          />
                        </Figure>
                      </td>
                      <td>RS. 15,000 /-</td>
                      <td>3 gms</td>
                      <td>ring</td>
                      <td>gold</td>
                      <td>24</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table> */}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal
                show={jewelleryModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <h4 className='headertext text-center'>Upload Brochure:</h4>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Add Brochure PDF</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Brochure PDF"
                                    className="w-50"
                                    name="image"
                                    autoComplete="off"
                                />
                            </Form.Group>
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
            </Modal>
            <Modal
                show={coinModal}
                onHide={handleCloseModal1}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <h4 className='headertext text-center'>Brochure of Sri Vinayaka Jewellers</h4>
                <Modal.Body>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal1} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default AddBrochure