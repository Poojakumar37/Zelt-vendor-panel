import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { BaseURL } from "../../../URL";

const image = require("../../../assets/imagesCustomer/image.png");

function CustomersScheme() {
    const navigate = useNavigate();
    const location = useLocation();
    const invoiceRef = useRef(null);
    const { Customer } = location.state;
    const [InvestmentData, setInvestmentData] = useState([]);
    const [Status, setStatus] = useState(false);
    const [OTP, setOTP] = useState();
    const [makingcharges, setmakingcharges] = useState(0);
    const [makingchargesdiscount, setmakingchargesdiscount] = useState(0);
    const [gstP, setgstP] = useState(0);
    const [Note, setNote] = useState("");
    const [goldrate, setgoldrate] = useState(7500);
    const [InvoiceModal, setInvoiceModal] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [downloading, setDownloading] = useState(false);

    const [vendorDetails] = useState(
        JSON.parse(localStorage.getItem("vendorDetails"))
    );

    console.log("Customer", Customer);

    const [EditModal, setEditModal] = useState(false);
    const [investmentDetails, setinvestmentDetails] = useState({});
    const handleCloseEditModal = () => setEditModal(false);
    const handleShowEditModal = (shop) => {
        setEditModal(true);
        setinvestmentDetails(shop);
    }

    const [CloseModal, setCloseModal] = useState(false);
    const [data, setdata] = useState({});
    const handleCloseCloseModal = (data) => { setCloseModal(false); handleShowEditModal(data); };
    const handleCloseCloseModal1 = () => { setCloseModal(false); setEditModal(false); };
    const handleShowCloseModal = (item) => {
        GenerateOtp(item);
    }

    useEffect(() => {
        if (Customer) {
            investData();
        }
    }, [Customer]);

    const investData = () => {
        axios.get(`${BaseURL}/user/getSchemeOrderUserID/${Customer?._id}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("API Response:", response.data.SchemeOrder);
                setInvestmentData(response.data.SchemeOrder);
            } else {
                console.error("Error fetching data:", response);
                setInvestmentData([]);
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setInvestmentData([]);
        });
    };

    const GenerateOtp = async (item) => {
        {
            const sentOTPApi = await axios.post(`${BaseURL}/otp/sendOtp/${Customer?.phone}`);
            if (sentOTPApi.status == 200) {
                console.log("sentOTPApi.data.otp,", sentOTPApi.data.otp,);
                setCloseModal(true);
                setdata(item);
                setEditModal(false);
                setStatus(true);
            } else {
                toast.error('Bad Request');
            }
        }
    };

    const handleSubmit = async (data) => {
        if (!OTP) {
            alert("Please enter OTP");
        }
        try {
            const response = await axios.post(`${BaseURL}/otp/verifyOtp`, {
                otp: OTP,
                phone: Customer?.phone
            });
            if (response.status === 200) {
                closeSchemeOrder(data);
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message);
        }
    };

    const closeSchemeOrder = async (data) => {
        console.log("sfsd", data, ((data?.Investment?.reduce((a, b) => a + parseInt(b?.Amount), 0)) / parseInt(goldrate))?.toFixed(2),);
        try {
            const response = await axios.patch(`${BaseURL}/user/closeSchemeOrder`, {
                id: data?._id,
                TotaConsolidatedAmount: data?.Investment?.reduce((a, b) => a + b?.Amount, 0),
                TotalGoldGram: data?.SchemeName === "SAMRUDDHI" ? (data?.Investment?.reduce((a, b) => a + (parseInt(b?.Amount) / parseInt(b?.GoldRateondate)), 0)?.toFixed(2)) : ((data?.Investment?.reduce((a, b) => a + parseInt(b?.Amount), 0)) / parseInt(goldrate))?.toFixed(2),
                GoldRateOnClosedDate: goldrate
            });
            if (response.status === 200) {
                alert("Scheme closed successfully");
                investData();
                setStatus(false);
                handleCloseCloseModal1();
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message);
        }
    };

    const handleViewInvoice = (investment) => {
        setSelectedInvestment(investment);
        setInvoiceModal(true);
    };

    const formatCurrency = (amount) => {
        return `₹${amount?.toLocaleString('en-IN')}`;
    };

    const generateFilename = () => {
        const invoiceNo = selectedInvestment?._id?.slice(-10) || 'invoice';
        const date = moment().format('DDMMYYYY');
        return `Zeltgold_Invoice_${invoiceNo}_${date}.png`;
    };

    const handleDownload = async () => {
        try {
            setDownloading(true);

            // Dynamically import html2canvas
            const html2canvas = (await import('html2canvas')).default;

            const canvas = await html2canvas(invoiceRef.current, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true
            });

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = generateFilename();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setDownloading(false);
                toast.success('Invoice downloaded successfully!');
            }, 'image/png');
        } catch (error) {
            setDownloading(false);
            console.error('Download error:', error);
            toast.error('Failed to download invoice. Please try again.');
        }
    };

    console.log("investmentDetails", investmentDetails);
    console.log("InvestmentData", InvestmentData);

    return (
        <div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
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
                                <h3 className="text1">{Customer?.name}</h3>
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

            {/* Scheme Details Modal */}
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
                                        <th>Invoice</th>
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
                                            <td>
                                                <FontAwesomeIcon
                                                    onClick={() => handleViewInvoice(scheme)}
                                                    icon={faEye}
                                                    className="editIcon"
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </td>
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

            {/* Invoice Modal */}
            <Modal
                show={InvoiceModal}
                onHide={() => {
                    setInvoiceModal(false);
                    setSelectedInvestment(null);
                }}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvestment && (
                        <div ref={invoiceRef} style={invoiceStyles.container}>
                            {/* Header */}
                            <div style={invoiceStyles.header}>
                                <h1 style={invoiceStyles.brandName}>Zeltgold</h1>
                                <h2 style={invoiceStyles.title}>Invoice</h2>
                            </div>

                            {/* Invoice Info */}
                            <div style={invoiceStyles.invoiceInfo}>
                                <div style={invoiceStyles.infoRow}>
                                    <div style={invoiceStyles.infoItem}>
                                        <p style={invoiceStyles.label}>Invoice Date:</p>
                                        <p style={invoiceStyles.value}>
                                            {moment(selectedInvestment?.InvestmentDate).format("DD-MM-YYYY")}
                                        </p>
                                    </div>
                                    <div style={invoiceStyles.infoItem}>
                                        <p style={invoiceStyles.label}>Invoice No:</p>
                                        <p style={invoiceStyles.valueHighlight}>
                                            {selectedInvestment?._id?.slice(-10)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div style={invoiceStyles.section}>
                                <div style={invoiceStyles.sectionHeader}>
                                    <h3 style={invoiceStyles.sectionTitle}>Customer Details</h3>
                                </div>
                                <div style={invoiceStyles.sectionContent}>
                                    <div style={invoiceStyles.detailRow}>
                                        <span style={invoiceStyles.detailLabel}>Name:</span>
                                        <span style={invoiceStyles.detailValue}>
                                            {Customer?.name}
                                        </span>
                                    </div>
                                    <div style={invoiceStyles.detailRow}>
                                        <span style={invoiceStyles.detailLabel}>Mobile:</span>
                                        <span style={invoiceStyles.detailValue}>
                                            {Customer?.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Summary */}
                            <div style={invoiceStyles.section}>
                                <div style={invoiceStyles.sectionHeader}>
                                    <h3 style={invoiceStyles.sectionTitle}>Transaction Summary</h3>
                                </div>
                                <div style={invoiceStyles.sectionContent}>
                                    <div style={invoiceStyles.summaryRow}>
                                        <span style={invoiceStyles.summaryLabel}>Amount Saved (INR):</span>
                                        <span style={invoiceStyles.summaryValue}>
                                            {formatCurrency(selectedInvestment?.Amount)}
                                        </span>
                                    </div>
                                    <div style={invoiceStyles.summaryRow}>
                                        <span style={invoiceStyles.summaryLabel}>Gold Converted (gm):</span>
                                        <span style={invoiceStyles.summaryValueGold}>
                                            {(selectedInvestment?.Amount / selectedInvestment?.GoldRateondate)?.toFixed(3)} gm
                                        </span>
                                    </div>
                                    <div style={invoiceStyles.divider} />
                                    <div style={invoiceStyles.summaryRow}>
                                        <span style={invoiceStyles.summaryLabel}>Platform Fee:</span>
                                        <span style={invoiceStyles.summaryValue}>
                                            {formatCurrency(selectedInvestment?.platformFee || 0)}
                                        </span>
                                    </div>
                                    <div style={invoiceStyles.divider} />
                                    <div style={invoiceStyles.summaryRow}>
                                        <span style={invoiceStyles.totalLabel}>Total Payable:</span>
                                        <span style={invoiceStyles.totalValue}>
                                            {formatCurrency(parseInt(selectedInvestment?.Amount) + parseInt(selectedInvestment?.platformFee || 0))}
                                        </span>
                                    </div>
                                </div>
                                <p style={invoiceStyles.footerTextNote}>
                                    <strong>NOTE: </strong>
                                    GST will be Applicable at the end when you purchase jewellery from the trusted vendor
                                </p>
                            </div>

                            {/* Footer */}
                            <div style={invoiceStyles.footer}>
                                <p style={invoiceStyles.footerText}>
                                    Thank you for investing with Zeltgold!
                                </p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleDownload}
                        variant="success"
                        disabled={downloading}
                    >
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        {downloading ? 'Downloading...' : 'Download Invoice'}
                    </Button>
                    <Button
                        onClick={() => {
                            setInvoiceModal(false);
                            setSelectedInvestment(null);
                        }}
                        variant="secondary"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Close Scheme Modal */}
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
        </div>
    );
}

// Invoice Styles
const invoiceStyles = {
    container: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '2px solid #004026',
    },
    brandName: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#004026',
        marginBottom: '8px',
        letterSpacing: '1px',
    },
    title: {
        fontSize: '22px',
        color: '#333',
        fontWeight: '600',
        marginBottom: 0,
    },
    invoiceInfo: {
        marginBottom: '32px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#D5AF61',
        padding: '16px',
        borderRadius: '8px',
        gap: '20px',
    },
    infoItem: {
        flex: 1,
    },
    label: {
        fontSize: '12px',
        color: '#666',
        marginBottom: '4px',
    },
    value: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '600',
        marginBottom: 0,
    },
    valueHighlight: {
        fontSize: '14px',
        color: '#004026',
        fontWeight: 'bold',
        marginBottom: 0,
    },
    section: {
        marginBottom: '32px',
    },
    sectionHeader: {
        backgroundColor: '#004026',
        padding: '12px 20px',
        borderRadius: '6px',
        marginBottom: '16px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 0,
    },
    sectionContent: {
        padding: '0 12px',
    },
    detailRow: {
        display: 'flex',
        padding: '10px 0',
    },
    detailLabel: {
        fontSize: '14px',
        color: '#666',
        width: '100px',
    },
    detailValue: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '500',
        flex: 1,
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
    },
    summaryLabel: {
        fontSize: '14px',
        color: '#555',
    },
    summaryValue: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '600',
    },
    summaryValueGold: {
        fontSize: '14px',
        color: '#004026',
        fontWeight: 'bold',
    },
    divider: {
        height: '1px',
        backgroundColor: '#e0e0e0',
        margin: '10px 0',
    },
    totalLabel: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#004026',
    },
    footerTextNote: {
        fontSize: '12px',
        color: '#666',
        margin: '12px 16px',
        lineHeight: '1.5',
    },
    footer: {
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '2px solid #004026',
        textAlign: 'center',
    },
    footerText: {
        fontSize: '14px',
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 0,
    },
};

export default CustomersScheme;