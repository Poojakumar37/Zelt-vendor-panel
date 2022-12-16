import React from 'react'
import { useNavigate } from "react-router-dom";
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'


function CreateScheme() {
    const navigate = useNavigate();

    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext text-center'>Add Scheme Details:</h3>
                    <Card className='p-2'>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Scheme Name:</Form.Label>
                                    <Form.Control
                                        maxLength={50}
                                        type="text"
                                        placeholder="Enter Scheme Name"
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
                                <Form.Group>
                                    <Form.Label>Select Type:</Form.Label>
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
                                <Form.Group>
                                    <Form.Label>Select Plan Duration:</Form.Label>
                                    <Form.Check
                                        // inline
                                        label="( 6+1 )"
                                        name="group1"
                                        type="radio"
                                    />
                                    <Form.Check
                                        // inline
                                        label="( 10+1 )"
                                        name="group1"
                                        type="radio"
                                    />
                                    <Form.Check
                                        // inline
                                        label="( 11+1 )"
                                        name="group1"
                                        type="radio"
                                    />
                                    <Form.Check
                                        // inline
                                        label="Custom Duration"
                                        name="group1"
                                        type="radio"
                                    />
                                    <Form.Control
                                        maxLength={50}
                                        type="text"
                                        placeholder="Enter Duration"
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
                                <Form.Group>
                                    <Form.Label>Your Discount (%) :</Form.Label>
                                    <Form.Control
                                        maxLength={50}
                                        type="text"
                                        placeholder="Enter Discount %"
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
                                <Form.Group>
                                    <Form.Label>Customer Can Redeem Scheme at:</Form.Label>
                                    <Form.Check
                                        // inline
                                        label="Any Store"
                                        name="group1"
                                        type="radio"
                                    />
                                    <Form.Check
                                        // inline
                                        label="The store selected at the time of starting the scheme"
                                        name="group1"
                                        type="radio"
                                    />
                                    <span className="text-danger">{ }</span>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <h4>Example Calculation:</h4>
                            <h6>(If the installment amount is Rs. 2,000)</h6>
                            <Col md={6}>
                                {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                                <h6>Amount paid by the customer in 6 installments</h6>
                                {/* <h6>12,000 /-</h6> */}
                                {/* </div> */}
                                {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                                <h6>Amount paid by the customer in 7th installment</h6>
                                <h6>Amount paid by you in 7th installment</h6>
                                {/* </div> */}
                            </Col>
                            <Col md={6}>
                                <h6>12,000 /-</h6>
                                <h6>400 /-</h6>
                                <h6>1,600 /-</h6>
                            </Col>
                        </Row>
                        <Row>
                            <h5>Maturity Amount:</h5>
                        </Row>
                        <Row>
                            <h6>14,0000 /-</h6>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={2}>
                            <Button variant="secondary" onClick={() => navigate('/vendorScheme')}>Cancel</Button>
                            </Col>
                            <Col md={2}>
                            <Button variant="warning">Save</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CreateScheme