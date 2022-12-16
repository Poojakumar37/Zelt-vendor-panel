import React, { useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const image = require('../../../assets/imagesCustomer/image.png');

function JewellerySold() {
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
                    <h3 className='headertext'>Jewellery Sold:</h3>
                    <div>
                        <Card className='p-2'>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                {/* <p style="background-image: url(' + image + ');"></p> */}
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                                <div  onClick={() => navigate('/Jewellery')} style={{ width: 200, height: 250, border: '1px solid', margin: 10 }}>
                                </div>
                            </div>                           
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JewellerySold