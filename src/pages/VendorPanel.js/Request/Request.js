import React, { useState } from 'react'
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Form, Row, Col } from 'react-bootstrap'
import PaymentRequest from './PaymentRequest';
import MemberRequest from './MemberRequest';
import { useEffect } from 'react';

function Request() {
    const [selection, setSelection] = useState('1')

    const onDataSelect = (e) => {
        setSelection(e.target.value)
    }

    const [schemeList, setSchemeList] = useState([])
    const getSchemeData = async () => {
        const scheme = localStorage.getItem('vendorData')
        console.log('scheme', JSON.parse(scheme));
        setSchemeList(JSON.parse(scheme)?.schemes)
    }
    console.log(schemeList, 'kjkhkgs');

    useEffect(() => {
        getSchemeData();
    }, [])
    console.log(selection, 'khkh');
    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Request</h3>
                    <div>
                        <Card className="shadow rounded p-2 w-100">
                            <Row>
                                <Col md={3}>
                                    <div className="leftedge d-flex justify-content-space">
                                        <Form.Select
                                            aria-label="Default select example"
                                            size="sm"
                                            onChange={onDataSelect}
                                        >
                                            {schemeList?.map((scheme, index) => (
                                                <option key={index} value={scheme._id}>
                                                    {scheme.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <PaymentRequest id={selection} />
                            {/* {selection === '2' && <MemberRequest />}
                            {selection === '3' && <Advertisements/>} */}
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Request