import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function SchemeDetail() {
    const [jewelleryModal, setJewelleryModal] = useState(false)
    const [coinModal, setCoinModal] = useState(false)
    const [selection, setSelection] = useState('1')

    const navigate = useNavigate();

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
                    <h3 className='headertext'>Schemes Sold:</h3>
                    <div>
                        <Card className='p-2'>
                            {/* <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}> */}
                            <div onClick={() => navigate('/Schemes')} className='background' style={{  height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding: 20 }}>
                                <h6>Swarn Sanchay (6+1):</h6>
                                <p>Demo link is a plugin which gives widget functionality to nopCommerce product page by displaying Demo button on Digital Products which can b</p>
                                <p>A min Rs. 100 investment for 6 months</p>
                                {/* <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div> */}
                            </div>

                            {/* </div> */}
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
        </div >
    )
}

export default SchemeDetail