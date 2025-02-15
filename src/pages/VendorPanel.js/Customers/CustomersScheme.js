import React, { useState, useEffect } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import AuthServices from "../../authServices/AuthServices";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";

const image = require("../../../assets/imagesCustomer/image.png");

function CustomersScheme() {
    const navigate = useNavigate();
    const location = useLocation()
    const { Customer } = location.state;
    const [InvestmentData, setInvestmentData] = useState([]);
    const [Status, setStatus] = useState(false);
    const [OTP, setOTP] = useState()
    const [makingcharges, setmakingcharges] = useState(0)
    const [makingchargesdiscount, setmakingchargesdiscount] = useState(0)
    const [gstP, setgstP] = useState(0)
    const [Note, setNote] = useState("")
    const [goldrate, setgoldrate] = useState(7500)

    const [vendorDetails] = useState(
        JSON.parse(localStorage.getItem("vendorDetails"))
    );


    console.log("Customer", Customer);

    const [EditModal, setEditModal] = useState(false);
    const [investmentDetails, setinvestmentDetails] = useState({})
    const handleCloseEditModal = () => setEditModal(false);
    const handleShowEditModal = (shop) => {
        setEditModal(true);
        setinvestmentDetails(shop)
    }


    const [CloseModal, setCloseModal] = useState(false);
    const [data, setdata] = useState({})
    const handleCloseCloseModal = (data) => { setCloseModal(false); handleShowEditModal(data); };
    const handleCloseCloseModal1 = () => { setCloseModal(false); setEditModal(false); };
    const handleShowCloseModal = (item) => {
        GenerateOtp(item)
    }


    useEffect(() => {
        if (Customer) {
            investData()
        }
    }, [Customer])

    const investData = () => {
        axios.get(`http://localhost:3001/api/user/getSchemeOrderUserID/${Customer?.UserID?._id}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("API Response:", response.data.SchemeOrder);  // Check the API data
                setInvestmentData(response.data.SchemeOrder);
            } else {
                console.error("Error fetching data:", response);
                setInvestmentData([]);  // Ensure state updates
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setInvestmentData([]);
        });
    };


    const GenerateOtp = async (item) => {
        {
            const sentOTPApi = await axios.post(`http://192.168.21.53:3001/api/otp/sendOtp/${Customer?.UserID?.phone}`)
            if (sentOTPApi.status == 200) {
                console.log("sentOTPApi.data.otp,", sentOTPApi.data.otp,);
                setCloseModal(true);
                setdata(item)
                setEditModal(false);
                setStatus(true)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Bad Request',
                });
            }
        }
    };

    const handleSubmit = async (data) => {
        if (!OTP) {
            alert("Please enter OTP")
        }
        try {

            const response = await axios.post(`http://192.168.21.53:3001/api/otp/verifyOtp`, {
                otp: OTP,
                phone: Customer?.UserID?.phone
            });
            if (response.status === 200) {
                closeSchemeOrder(data)
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message)
        }
    };


    const closeSchemeOrder = async (data) => {
        console.log("sfsd", data, ((data?.Investment?.reduce((a, b) => a + parseInt(b?.Amount), 0)) / parseInt(goldrate))?.toFixed(2),);

        try {
            const response = await axios.patch(`http://192.168.21.53:3001/api/user/closeSchemeOrder`, {
                id: data?._id,
                TotaConsolidatedAmount: data?.Investment?.reduce((a, b) => a + b?.Amount, 0),
                TotalGoldGram: data?.SchemeName === "SAMRUDDHI" ? (data?.Investment?.reduce((a, b) => a + (parseInt(b?.Amount) / parseInt(b?.GoldRateondate)), 0)?.toFixed(2)) : ((data?.Investment?.reduce((a, b) => a + parseInt(b?.Amount), 0)) / parseInt(goldrate))?.toFixed(2),
                // TotalMakingCharge: makingcharges,
                // DiscountOnMakingCharges: makingchargesdiscount,
                // MakingChargesAfterDiscount: makingchargesdiscount ? (makingcharges - ((makingcharges / makingchargesdiscount))) : makingcharges,
                // GSTP: gstP,
                // GSTAmount: gstP,
                // TotalAmountCustomerPaid: parseInt((makingchargesdiscount ? (makingcharges - ((makingcharges / makingchargesdiscount))) : makingcharges)) + parseInt(5000),
                // Note: Note,
                GoldRateOnClosedDate: goldrate
            });
            if (response.status === 200) {
                alert("Scheme closed successfully")
                investData()
                setStatus(false)
                handleCloseCloseModal1()
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message)
        }
    };



    console.log("investmentDetails", investmentDetails);
    console.log("InvestmentData", InvestmentData);

    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className="headertext">Customers Scheme</h3>
                    <div>
                        <Card className="p-2">
                            <Row>
                                <Col md={4}>

                                </Col>
                            </Row>
                            <Row>
                                <h3 className="text1">{Customer?.UserID?.name}</h3>
                            </Row>
                            <hr />
                            <Card className="p-2">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Scheme Name</th>
                                            <th>Start Date</th>
                                            <th>Tenure</th>
                                            <th>No. of Installments paid</th>
                                            <th>Status</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {InvestmentData?.map((scheme, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{scheme?.SchemeName}</td>
                                                <td> {moment(scheme?.StartDate).format("DD-MM-YYYY")}</td>
                                                <td>{scheme?.SchemeName === "VINAYAKA's GOLD JAR" ? "-" : `(${scheme?.SchemeID?.duration?.customerTime} + ${scheme?.SchemeID?.duration?.vendorTime})`} </td>
                                                <td>{scheme?.Investment?.length > 0 ? scheme?.Investment?.length : 0}</td>
                                                <td style={{ color: scheme?.Status === "Closed" ? "red" : "green" }}> {scheme?.Status}</td>
                                                <td>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleShowEditModal(scheme)}
                                                        icon={faEye}
                                                        className="editIcon"
                                                    />
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal
                show={EditModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Body>
                    <h3 className="headertext text-center">Scheme Details</h3>
                    <Card className="p-2" style={{ overflow: "hidden" }}>
                        <Row>
                            <Col className="md-6 headertext">{<p>{investmentDetails?.SchemeName}</p>}</Col>
                            <Col className="md-6">{<p style={{ textAlign: "end" }}>Start Date : {moment(investmentDetails?.StartDate).format("DD-MM-YYYY")}</p>}</Col>
                        </Row>
                        <Row className="mt-5">
                            <p style={{ textAlign: "justify" }}><b>Description :</b> {investmentDetails?.Discription}</p>
                        </Row>
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Payment Status</th>
                                        {investmentDetails?.SchemeName === "SAMRUDDHI" || investmentDetails?.SchemeName === "VINAYAKA's GOLD JAR" ? (<>
                                            <th>Gold Rate</th>
                                            <th>Gold/gram</th>
                                        </>) : <></>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {investmentDetails?.Investment?.map((scheme, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td> {moment(scheme?.InvestmentDate).format("DD-MM-YYYY")}</td>
                                            <td>{scheme?.Amount}</td>
                                            <td>{scheme?.PaymentStatus} </td>
                                            {investmentDetails?.SchemeName === "SAMRUDDHI" || investmentDetails?.SchemeName === "VINAYAKA's GOLD JAR" ? (<>
                                                <td>{scheme?.GoldRateondate}</td>
                                                <td> {(scheme?.Amount / scheme?.GoldRateondate).toFixed(2)}</td>
                                            </>) : <></>}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <p style={{ textAlign: "justify" }}><b>Terms and Condition :</b> {investmentDetails?.TermsandCondition}</p>
                            {investmentDetails?.Status === 'Closed' ? <p style={{ textAlign: "justify", color: "red" }}>Closed on {moment(investmentDetails?.ClosedDate)?.format("DD-MM-YYYY")}</p> : ""}
                        </Row>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseEditModal} variant="secondary">
                        Cancel
                    </Button>
                    {investmentDetails?.Status === 'Closed' ?
                        <Button
                            variant="danger"
                            onClick={handleCloseEditModal}
                        >
                            Closed
                        </Button> :
                        <Button
                            variant="warning"
                            onClick={() => {
                                handleShowCloseModal(investmentDetails);
                            }}
                        >
                            {investmentDetails?.Investment?.length == investmentDetails?.SchemeID?.duration?.customerTime ? "Close Scheme" : "Pre-Close Scheme"}
                        </Button>}
                </Modal.Footer>
            </Modal>

            <Modal
                show={CloseModal}
                onHide={() => handleCloseCloseModal(data)}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Body>
                    <h3 className="headertext text-center">{data?.UserID?.name} - {data?.SchemeName}({data?.SchemeID?.duration?.customerTime}+{data?.SchemeID?.duration?.vendorTime})</h3>
                    <Card className="p-5" style={{ overflow: "hidden" }}>
                        {Status ?
                            <Row>
                                <Col md={2}></Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter OTP"
                                            size="sm"
                                            name="Subtitle"
                                            onChange={(e) => setOTP(e.target.value)}
                                            autoComplete="off"
                                            className="mb-3"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <button style={{ backgroundColor: "#4287f5", color: "white", border: "none", padding: "5px" }} onClick={() => handleSubmit(data)}>
                                        Verify OTP
                                    </button>
                                </Col>
                            </Row>
                            : (<>
                                <Row style={{ border: "1px solid #ced4da" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}>Total amount paid</Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6}>{data?.Investment?.reduce((a, b) => a + b?.Amount, 0)} /-</Col>
                                    </Row></Col>
                                </Row>

                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}>Total gold in Grams</Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6}>{data?.SchemeName === "SAMRUDDHI" ? (data?.Investment?.reduce((a, b) => a + (parseInt(b?.Amount) / parseInt(b?.GoldRateondate)), 0)?.toFixed(2)) : ((data?.Investment?.reduce((a, b) => a + parseInt(b?.Amount), 0)) / parseInt(goldrate))?.toFixed(2)} </Col>
                                    </Row></Col>
                                </Row>
                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}>Making charges</Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6} className="mt-2"> <Form.Control
                                            type="number"
                                            placeholder="Enter Making charges"
                                            size="sm"
                                            name="Subtitle"
                                            onChange={(e) => setmakingcharges(e.target.value)}
                                            autoComplete="off"
                                            className="mb-3"
                                        /></Col>
                                    </Row></Col>
                                </Row>
                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>Making Charges discount % (Optional)</Col>
                                            <Col md={6} className="mt-2"> <Form.Group>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Making charges"
                                                    size="sm"
                                                    name="Subtitle"
                                                    onChange={(e) => setmakingchargesdiscount(e.target.value)}
                                                    autoComplete="off"
                                                    className="mb-3"
                                                />
                                            </Form.Group></Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>Discount Amount</Col>
                                            <Col md={6}>{makingchargesdiscount ? ((makingcharges / makingchargesdiscount)) : makingcharges} /-</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}>Total making charges after discount</Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6}>{makingchargesdiscount ? (makingcharges - ((makingcharges / makingchargesdiscount))) : makingcharges}/-</Col>
                                    </Row></Col>
                                </Row>

                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>GST %</Col>
                                            <Col md={6} className="mt-2"> <Form.Group>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter GST %"
                                                    size="sm"
                                                    name="Subtitle"
                                                    onChange={(e) => setgstP(e.target.value)}
                                                    autoComplete="off"
                                                    className="mb-3"
                                                />
                                            </Form.Group></Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>GST Amount</Col>
                                            <Col md={6}>5000/- </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}><b>Total Amount</b></Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6}><b>{parseInt((data?.Investment?.reduce((a, b) => a + b?.Amount, 0))) + parseInt((makingchargesdiscount ? (makingcharges - ((makingcharges / makingchargesdiscount))) : makingcharges)) + parseInt(5000)} /-</b></Col>
                                    </Row></Col>
                                </Row>
                                <Row style={{ border: "1px solid #ced4da", borderTop: "none" }}>
                                    <Col md={6}> <Row>
                                        <Col md={6}><b>Remaining Amount</b></Col>
                                        <Col md={6}></Col>
                                    </Row></Col>
                                    <Col md={6}><Row>
                                        <Col md={6}></Col>
                                        <Col md={6}><b>{((parseInt((makingchargesdiscount ? (makingcharges - ((makingcharges / makingchargesdiscount))) : makingcharges)) + parseInt(5000)))} /-</b></Col>
                                    </Row></Col>
                                </Row>

                                <Row className="mt-5">
                                    <Form.Group>
                                        <Form.Label>NOTE (optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type here"
                                            size="sm"
                                            name="Subtitle"
                                            style={{ height: "100px" }}
                                            onChange={(e) => setNote(e.target.value)}
                                            autoComplete="off"
                                            className="mb-3"
                                        />
                                    </Form.Group>

                                </Row>
                            </>)
                        }
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    {
                        Status ? <></> : (<>
                            <Button onClick={() => handleCloseCloseModal(data)} variant="secondary">
                                Cancel
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => {
                                    closeSchemeOrder(data);
                                }}
                            >
                                Close Scheme
                            </Button>
                        </>)
                    }
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default CustomersScheme;
