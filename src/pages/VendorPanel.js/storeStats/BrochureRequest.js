import React, { useEffect, useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const pdfimage = require('../../../assets/imagesCustomer/pdf.png');

function BrochureRequest() {
    const [modalData, setModalData] = useState([])

    const [modalView, setModalView] = useState(false)
    const handleCloseModal = () => setModalView(false)

    const handleShowModal = (ele) => {
        setModalView(true)
        setModalData(ele.requests)
    }

    const [brochureRequest, setBrochureRequest] = useState('');
    const [shopId] = localStorage.getItem('shopId');

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        const getBrochureRequests = async () => {
            const data = await axios.get(`https://zelt-product.moshimoshi.cloud/shop/brochure-requests?shopId=${shopId}`, {
                headers: { "x-access-Token": localStorage.getItem("accessToken") }
            }).catch((error) => {
                console.log('error ==>', error);
            })
            console.log("getBrochureRequests ===>", data.data.data)
            setBrochureRequest(data.data.data)
        }
        getBrochureRequests();
    }, [shopId])

    const acceptBrochureRequests = async () => {
        let payload=[]
        const data = await axios.patch(`https://zelt-product.moshimoshi.cloud/shop/approve-brochure?shopId=${shopId}&userId=`,payload, {
            headers: { "x-access-Token": localStorage.getItem("accessToken") }
        }).catch((error) => {
            console.log('error ==>', error);
        })
        console.log("getBrochureRequests ===>", data.data.data)
        setBrochureRequest(data.data.data)
    }

    const navigate = useNavigate();

    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Brochure Requests</h3>
                    <div>
                        <Card className='p-2'>
                            {/* <hr /> */}
                            {
                                brochureRequest && brochureRequest.map((b, i) => (
                                    <Row key={i}>
                                        <Col md={3}>
                                            <p style={{ margin: 10 }}>{b.user.name}</p>
                                        </Col>
                                        <Col md={3}>
                                            {/* <div  style={{margin:10}}><Button variant="warning">Sent</Button></div> */}
                                            <div style={{ margin: 10 }}><Button onClick={() => handleShowModal(b)} variant="outline-warning">Send</Button></div>
                                        </Col>
                                    </Row>
                                ))
                            }

                        </Card>
                    </div>
                </div>
            </div>
            <Modal
                show={modalView}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <h4 className='headertext text-center'>Accept Brochures</h4>
                <Modal.Body>
                    {
                        modalData && modalData.map((b, i) => (
                            <div onClick={() => window.open(b.file, '_blank', 'noreferrer')} style={{ width: 50, height: 200,margin:20 }}>
                                <img src={pdfimage} style={{ width: 100, height: 100 }} ></img>
                                {b.title}
                            </div>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="warning">
                        Accept All
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default BrochureRequest