import React, { useState, useEffect } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { useSearchParams } from "react-router-dom";

const image = require('../../../assets/imagesCustomer/image.png');

function CustomerDetail() {
    const [jewelleryModal, setJewelleryModal] = useState(false)
    const [coinModal, setCoinModal] = useState(false)
    const [selection, setSelection] = useState('1')
    const [userData, setUserData] = useState([{ amount: 0, installmentsPaid: [], scheme: "", user: {} }])
    const [schemeList, setSchemeList] = useState([])
    const [productList, setProductList] = useState([])

    const handleCloseModal = () => setJewelleryModal(false)
    const handleShowModal = () => setJewelleryModal(true)

    const handleCloseModal1 = () => setCoinModal(false)
    const handleShowModal1 = () => setCoinModal(true)

    let [searchParams, setSearchParams] = useSearchParams();
    let id = searchParams.get("id")
    console.log("CUSTOMER ID--->", id)
    const getAdminData = async () => {
        const data = await axios.get(`https://zelt-order.moshimoshi.cloud/order/transactions?userId=` + id,
            {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                },
            }
        )
            .catch((error) => {
                console.log("error ==>", error);
            });
        if (data.status == 200) {
            setUserData(data.data.data)
            let schemes = []
            let products = []
            data.data.data.map(x => {
                if (x.type == "scheme") schemes.push(x)
                else {
                    products.push(x)
                    console.log("PRODUCT--->",x)
                }
            })
            setSchemeList(schemes)
            setProductList(products)
        }

        console.log("admin details  ===> ", data);
    }
    useEffect(() => {
        getAdminData();
    }, [])
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
                    <h3 className='headertext'>Customer Details</h3>
                    <div>
                        <Card className='p-2'>
                            <Row>
                                <Col md={2}>
                                    <p>Name:</p>
                                    <p>Phone Number:</p>
                                    <p>Email:</p>
                                </Col>
                                <Col md={3}>
                                    <p>{userData[0]?.user?.name}</p>
                                    <p>{userData[0]?.user?.phone}</p>
                                    <p>{userData[0]?.user?.email}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Card className='p-2'>
                                <h3 className='text1'>Active Schemes</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Scheme Name</th>
                                            <th>Installment Amount</th>
                                            <th>Total Investment</th>
                                            {/* <th>Outstanding</th>
                                            <th>Tenure</th> */}
                                        </tr>
                                    </thead>
                                    {
                                        schemeList && schemeList.map((c, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td> <div> {c.scheme._id}</div></td>
                                                <td>{c.amount}</td>
                                                <td> {(c.installmentsPaid.length) * c.amount}</td>
                                                {/* <td>
                                                </td>
                                                <td>
                                                </td> */}
                                            </tr>
                                        ))
                                    }
                                </Table>
                                <hr />
                                <h3 className='text1'>Jewellery Purchased</h3>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Jewellery Name</th>
                                            <th>Jewellery Image</th>
                                            <th>Price</th>
                                            <th>Weight</th>
                                            <th>Purity</th>
                                            <th>Purchased Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList && productList.map((c, i) => (
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{c?.products[0]?.title}</td>
                                                <td>
                                                    <Figure>
                                                        <Figure.Image
                                                            width={100}
                                                            height={80}
                                                            src={c?.products[0]?.image[0]}
                                                        />
                                                    </Figure>
                                                </td>
                                                <td>{c?.products[0]?.price}</td>
                                                <td>{c?.products[0]?.weight}</td>
                                                <td>24</td>
                                                <td>{new Date(c?.createdAt).toLocaleDateString("en-US")}</td>
                                            </tr>))}

                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <Modal
                show={jewelleryModal}
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
                            <Form.Check
                                inline
                                label="Gold"
                                name="group1"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="Silver"
                                name="group1"
                                type="radio"
                            />
                            <Form.Check
                                inline
                                label="Platinum"
                                name="group1"
                                type="radio"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Name"
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
                                <Form.Label>Purity</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Purity"
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
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    maxLength={50}
                                    type="text"
                                    placeholder="Enter Weight"
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
                                <Form.Label>Select Stores</Form.Label>
                                <div className="leftedge d-flex justify-content-space">
                                    <Form.Select
                                        aria-label="Default select example"
                                        size={"sm"}
                                        className="selectsizesmall"
                                        onChange={() => { }}
                                    >
                                        <option >Select Store</option>
                                        <option value="1">hari</option>
                                        <option value="2">gopal</option>
                                        <option value="3">mani</option>
                                        <option value="4">prema</option>
                                        <option value="5">hema</option>
                                        <option value="6">Ragu</option>
                                        <option value="7">ram</option>
                                    </Form.Select>
                                </div>
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Payment Option</Form.Label>
                                <div className="leftedge d-flex justify-content-space">
                                    <Form.Select
                                        aria-label="Default select Payment"
                                        size={"sm"}
                                        className="selectsizesmall"
                                        onChange={() => { }}
                                    >
                                        <option >Select Payment Option</option>
                                        <option value="1">Offline</option>
                                        <option value="2">Online</option>
                                    </Form.Select>
                                </div>
                                <span className="text-danger">{ }</span>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label></Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Availability"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Add Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Product Image"
                                    className="w-50"
                                    name="image"
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button variant="warning">Update Image</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Add Product Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Product Video"
                                    className="w-50"
                                    name="image"
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Button variant="warning">Update Video</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="warning">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div >
    )
}

export default CustomerDetail