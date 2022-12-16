import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'

const image = require('../../../assets/imagesCustomer/image.png');


function VendorProfile() {
  const [profileModal, setProfileModal] = useState(false)
  const handleCloseModal = () => setProfileModal(false)
  const handleShowModal = () => setProfileModal(true)

  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className='headertext'>Profile</h3>
          <div>
            <Card className='p-2'>
              <Row>
                <Col md={3}>
                  <h3 className='headertext'>Vendor Profile</h3>
                </Col>
                <Col md={3}>
                  <Button variant="warning" onClick={handleShowModal}>Edit Profile</Button>
                </Col>
              </Row>
              <Row>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    // alt="171x180"
                    src={image}
                  />
                </Figure>
              </Row>
              <h4 className='headertext'>Personal Deatils</h4>
              <Row>
                <Col md={3}>
                  <h5>Name:</h5>
                </Col>
                <Col md={3}>
                  <h5>Hari</h5>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>Phone Number:</h5>
                </Col>
                <Col md={3}>
                  <h5>+91 8756476456</h5>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>E-mail Id :</h5>
                </Col>
                <Col md={3}>
                  <h5>hari@gmail.com</h5>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>Gender :</h5>
                </Col>
                <Col md={3}>
                  <h5>male</h5>
                </Col>
              </Row>
              <hr />
              <h4 className='headertext'>Bank Deatils</h4>
              <Row>
                <Col md={3}>
                  <h5>Bank Name:</h5>
                </Col>
                <Col md={3}>
                  <h5>SBI</h5>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>Account Number:</h5>
                </Col>
                <Col md={3}>
                  <h5>8756476456</h5>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>IFSC Code</h5>
                </Col>
                <Col md={3}>
                  <h5>ifsc00076456</h5>
                </Col>
              </Row>
              <hr />
              <Card className='p-2'>

                <hr />
                <h3 className='text1'>Available stores</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Store Name</th>
                      <th>Location</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sri Vinayaka Jewellers</td>
                      <td>Bangalore</td>
                      <td>9878976098</td>
                      <td>manu@gmail.com</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Sri Vinayaka Jewellers</td>
                      <td>Bangalore</td>
                      <td>9878976098</td>
                      <td>manu@gmail.com</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sri Vinayaka Jewellers</td>
                      <td>Bangalore</td>
                      <td>9878976098</td>
                      <td>manu@gmail.com</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        show={profileModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Edit Profile Details:</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Your Name"
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
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Bank Name"
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
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Phone Number"
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
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Account Number"
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
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Email Id"
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
                <Form.Label>Ifsc Code</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter IFSC Code"
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
            <Col>
          <Form.Group className="mb-3">
            <Form.Label>Select Profile Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Profile Image"
              className="w-50"
              name="image"
              // value={}
              // onChange={}
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
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default VendorProfile