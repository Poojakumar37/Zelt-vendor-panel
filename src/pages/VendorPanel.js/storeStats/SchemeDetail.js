import React, { useState, useEffect } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const image = require('../../../assets/imagesCustomer/image.png');

function SchemeDetail() {
    const [jewelleryModal, setJewelleryModal] = useState(false)
    const [coinModal, setCoinModal] = useState(false)
    const [selection, setSelection] = useState('1')
    const [shopId] = useState(localStorage.getItem('shopId'));
    const [schemeData, setSchemeData] = useState({name:'',minAmt:0,description:'',duration:0})
    const navigate = useNavigate();

    const onGoldSelect = (e) => {
        setSelection(e.target.value)
    }

    useEffect(() => {
        const getSchemeData = async () => {
            const data = await axios.get(`https://zelt-product.moshimoshi.cloud/scheme/stats/` + shopId + `?schemeId=` + `63bc1016e515fb670c05e9b9`, {
                headers: { "x-access-Token": localStorage.getItem("accessToken") }
            }).catch((error) => {
                console.log('error ==>', error);
            })
            console.log("getShopStats ===>", data.data.data)
            setSchemeData(data.data.data)
        }
        getSchemeData();
    }, [shopId])


    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Schemes Sold</h3>
                    <div>
                        <Card className='p-2'>
                            {/* <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}> */}
                            <div onClick={() => navigate('/Schemes')} className='background' style={{ height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding: 20 }}>
                                <h6>{schemeData.name} {schemeData.duration.customerTime}+{schemeData.duration.vendorTime}</h6>
                                <p>{schemeData.description}</p>
                                <p>A min Rs. {schemeData.minAmt} investment for {schemeData.duration.customerTime} months</p>
                                {/* <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <h1 style={{}}>
                                            20
                                        </h1>
                                    </div> */}
                            </div>

                            {/* </div> */}
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
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            schemeData.customers && schemeData.customers.map((c, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{c.name}</td>
                                                    <td>{c.phone}</td>
                                                    <td>{c.email}</td>
                                                    <td>
                                                        <FontAwesomeIcon
                                                            onClick={() => navigate('/CustomerDetail?id=' + c._id)}
                                                            icon={faEye} className="editIcon"
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
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