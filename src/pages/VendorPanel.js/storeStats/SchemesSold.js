import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function SchemesSold() {
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
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <div onClick={() => navigate('/Schemes')} className='background' style={{ width: 200, height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding:20 }}>
                                    <h6>Swarn Sanchay (6+1)</h6>
                                    <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div>
                                </div>
                                <div onClick={() => navigate('/Schemes')} className='background' style={{ width: 200, height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding:20 }}>
                                    <h6>Swarn Sanchay (6+1)</h6>
                                    <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div>
                                </div>
                                <div onClick={() => navigate('/Schemes')} className='background' style={{ width: 200, height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding:20 }}>
                                    <h6>Swarn Sanchay (6+1)</h6>
                                    <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div>
                                </div>
                                <div onClick={() => navigate('/Schemes')} className='background' style={{ width: 200, height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding:20 }}>
                                    <h6>Swarn Sanchay (6+1)</h6>
                                    <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div>
                                </div>
                                <div onClick={() => navigate('/Schemes')} className='background' style={{ width: 200, height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding:20 }}>
                                    <h6>Swarn Sanchay (6+1)</h6>
                                    <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <hr />

                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SchemesSold