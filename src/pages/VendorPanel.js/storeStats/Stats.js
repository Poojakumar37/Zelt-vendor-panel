import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function Stats() {
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
          <h3 className='headertext'>Store Statestics</h3>
          <div>
            <Card className='p-2'>
              <Row>
                <Col md={4}>
                  <h3 className='headertext'>Jewellery Sold:</h3>
                </Col>
                <Col md={4}>
                  <Button onClick={() => navigate('/JewellerySold')} variant="warning">View More</Button>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <Plot
                    data={[
                      {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16],
                        type: 'bar',
                      }

                    ]}
                    layout={{
                      width: '80%', height: 440, title: 'Chart showing Jewellery sold in the year 2020', xaxis: {
                        tickangle: -45
                      },
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <h3 className='headertext'>Schemes Sold:</h3>
                </Col>
                <Col md={4}>
                  <Button onClick={() => navigate('/SchemesSold')} variant="warning">View More</Button>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <Plot
                    data={[
                      {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: [19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16],
                        type: 'bar',
                      }

                    ]}
                    layout={{
                      width: '80%', height: 440, title: 'Chart showing Schemes sold in the year 2020', xaxis: {
                        tickangle: -45
                      },
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                    <Col md={4}>
                    <h3 className='headertext'>Brochure Requests:</h3>
                    </Col>
                    <Col md={3}>
                      <Button onClick={() => navigate('/BrochureRequest')}  variant="warning">View More</Button>
                    </Col>
                  </Row>
              <Row>
                <Col md={3}>
                  <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <h1 style={{}}>
                      20
                    </h1>
                  </div>
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
      <Modal
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
      </Modal>
      <Modal
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
      </Modal>
    </div >
  )
}

export default Stats