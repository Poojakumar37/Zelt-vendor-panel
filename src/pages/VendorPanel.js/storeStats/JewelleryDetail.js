import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const image = require('../../../assets/imagesCustomer/image.png');

function JewelleryDetail() {
    const location = useLocation();
    const data = location.state?.data; // Access the data prop from location.state
    console.log(data,"datadata")
     const users = location.state?.data.users
    if (!data) {
        return <div>No data available</div>;
    }


    return (
        <div>
        <div className="sidebar">
            <SideBar />
        </div>
        <div className="content">
            <div className="container">
                <FirstNavbar />
                <h3 className='headertext'>Jewellery Sold</h3>
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
                                        src={data?.image}
                                    />
                                </Figure>
                            </Col>
                            <Col md={2}>
                                <p>Metal:</p>
                                <p>Category:</p>
                                <p>Weight:</p>
                                <p>Purity:</p>
                                <p>Price</p>
                            </Col>
                            <Col md={3}>
                                <p>{data?.metal}</p>
                                <p>{data?.metal}</p>
                                <p>{data?.weight} gms</p>
                                <p>{data?.purity}K</p>
                                <p>RS. {data?.price} /-</p>
                            </Col>
                        </Row>
                        <hr />
                        <Card className='p-2'>
                            <h3 className='text1'>Customer List</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer Name</th>
                                        <th>Phone Number</th>
                                        <th>E-mail Id</th>
                                        {/* <th>View</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                {/* <td>
                                                    <FontAwesomeIcon
                                                        onClick={() => navigate('/CustomerDetail')}
                                                        icon={faEye} className="editIcon"
                                                    />
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                            </Table>
                        </Card>
                    </Card>
                </div>
            </div>
        </div>
    </div>
    )
}

export default JewelleryDetail