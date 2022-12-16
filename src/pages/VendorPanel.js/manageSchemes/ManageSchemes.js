import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const image = require('../../../assets/imagesCustomer/image.png');

function ManageSchemes() {

  const navigate = useNavigate();

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
          <h3 className='headertext'>Schemes</h3>
          <div>
            <Card className='p-2'>
              <Row>
                <Col md={4}>
                  <h3 className='headertext'>Manage Schemes:</h3>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  {/* <Button>Choose a Scheme Template</Button> */}
                  <Button variant="outline-warning">Choose a Scheme Template</Button>
                </Col>
                <Col md={4}>
                  {/* <Button>Create Your own Scheme</Button> */}
                  <Button variant="outline-warning" onClick={() => navigate('/CreateScheme')} >Create Your own Scheme</Button>
                </Col>
              </Row>
              <hr />
              <Card className='p-2'>
                <h3 className='text1'>Schemes List:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Scheme Name</th>
                      <th>Min Amount</th>
                      <th>Tenure</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Swarna Gold Plan</td>
                      <td>RS. 1,000 /-</td>
                      <td>(6 + 1)</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => navigate('/CreateScheme')}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Swarna Gold Plan</td>
                      <td>RS. 1,000 /-</td>
                      <td>(6 + 1)</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => navigate('/CreateScheme')}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Swarna Gold Plan</td>
                      <td>RS. 1,000 /-</td>
                      <td>(6 + 1)</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => navigate('/CreateScheme')}
                          icon={faEdit} className="editIcon"
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
        <h4 className='headertext text-center'>Add/Edit Scheme Details:</h4>
        <Modal.Body>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Scheme Name</Form.Label>
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
                <Form.Label>Select Type</Form.Label>
                <Form.Check
                  inline
                  label="Amount"
                  name="group1"
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Weight"
                  name="group1"
                  type="radio"
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
      {/* <Modal
        show={coinModal}
        onHide={handleCloseModal1}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Add/Edit Bar/Coins:</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Check
                inline
                label="Bar"
                name="group1"
                type="radio"
              />
              <Form.Check
                inline
                label="Coin"
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
                    <option value="1">Sri Vinayaka Jewellers, Mumbai</option>
                    <option value="2">Sri Vinayaka Jewellers, Bengalore</option>
                    <option value="3">Sri Vinayaka Jewellers, Jay Nagar</option>
                    <option value="4">Sri Vinayaka Jewellers, JP Nagar</option>
                    <option value="5">Sri Vinayaka Jewellers, Delhi</option>
                    <option value="6">Sri Vinayaka Jewellers, KR Market</option>
                    <option value="7">Sri Vinayaka Jewellers, Mangalore</option>
                  </Form.Select>
                </div>
                <span className="text-danger">{ }</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Model</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Model"
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
                <Form.Label>Enter Packaging</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Packaging"
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
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Admin Image"
                  className="w-50"
                  name="image"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button variant="warning">Update</Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal1} variant="secondary">
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

export default ManageSchemes