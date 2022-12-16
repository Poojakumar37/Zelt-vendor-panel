import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const image = require('../../../assets/imagesCustomer/image.png');


function ManageAdmin() {
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
          <h3 className='headertext'>Employees</h3>
          <div>
            <Card className='p-2'>
              <Row>
                <Col md={3}>
                  <h3 className='headertext'>Manage Admin</h3>
                </Col>
                <Col md={3}>
                  <Button variant="warning" onClick={handleShowModal}>Add new Admin</Button>
                </Col>
              </Row>

              <Card className='p-2'>

                {/* <hr /> */}
                <h3 className='text1'>Available Employees:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Employee Name</th>
                      <th>Employee Number</th>
                      <th>Employee Type</th>
                      <th>Email</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Kumar</td>
                      <td>9878976098</td>
                      <td>Moderator</td>
                      <td>manu@gmail.com</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Kumar</td>
                      <td>9878976098</td>
                      <td>Admin</td>
                      <td>manu@gmail.com</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
                          icon={faEdit} className="editIcon"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Kumar</td>
                      <td>9878976098</td>
                      <td>Moderator</td>
                      <td>manu@gmail.com</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleShowModal()}
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
      <Modal
        show={profileModal}
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
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
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
                <Form.Label>Store Name</Form.Label>
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
                <Form.Label>Access Type</Form.Label>
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
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select Admin Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Admin Image"
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
            Generate Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default ManageAdmin