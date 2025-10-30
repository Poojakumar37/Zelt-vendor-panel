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
import { use } from "react";

const image = require("../../../assets/imagesCustomer/image.png");

function CustomerWallete() {
    const navigate = useNavigate();
    const location = useLocation();
    const invoiceRef = useRef(null);
    const { Customer, selectedShop } = location.state;
    const [Wallete, setWallete] = useState([]);
    const [InvoiceModal, setInvoiceModal] = useState(false);
    const [selectedWalletItem, setSelectedWalletItem] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [CustomerGold, setCustomerGold] = useState()
    const [ProductName, setProductName] = useState()
    const [OTP, setOTP] = useState();
    const [remedModal, setremedModal] = useState(false);
    const [CloseModal, setCloseModal] = useState(false);
    const [data, setdata] = useState({});
    const [Status, setStatus] = useState(false);
    const [remedgold, setremedgold] = useState(0)

    const [vendorDetails] = useState(
        JSON.parse(localStorage.getItem("vendorDetails"))
    );

    const handleShowremedModal = () => {
        setremedModal(true);
    }


    const handleShowCloseModal = (item) => {

    }

    useEffect(() => {
        if (Customer && selectedShop) {
            getWallete();
            getWalletepurches()
        }
    }, [Customer, selectedShop]);

    const getWallete = async () => {
        console.log("functioncalled");
        axios.get(`${BaseURL}/user/Wallete/${Customer?._id}/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                setWallete(response.data.Wallete);
            } else {
                console.error("Error fetching data:", response);
                setWallete([]);
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setWallete([]);
        });
    };


    const getWalletepurches = async () => {
        axios.get(`${BaseURL}/user/walletepurches/${Customer?._id}/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                const remedgold = response?.data?.walletepurches?.reduce((a, b) => a + b.gold, 0)
                console.log("remedgold", remedgold);
                setremedgold(remedgold);
            } else {
                console.error("Error fetching data:", response);
                setremedgold(0);
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setremedgold(0);
        });
    };


    const handleViewInvoice = (item) => {
        setSelectedWalletItem(item);
        setInvoiceModal(true);
    };

    const formatCurrency = (amount) => {
        return `₹${amount?.toLocaleString('en-IN')}`;
    };

    const generateFilename = () => {
        const invoiceNo = selectedWalletItem?._id?.slice(-10) || 'invoice';
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


    const GenerateOtp = async () => {
        if (!CustomerGold) {
            toast.error('Please enter gold');
        } else if (!ProductName) {
            toast.error('Please enter Product name');
        } else {
            const sentOTPApi = await axios.post(`${BaseURL}/otp/sendOtp/${Customer?.phone}`);
            if (sentOTPApi.status == 200) {
                console.log("sentOTPApi.data.otp,", sentOTPApi.data.otp,);
                setCloseModal(true);
                setStatus(true);
                setremedModal(false)
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
                buyGold(data);
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message);
        }
    };

    const todatydate = moment().format("DD-MM-YYYY")
    const buyGold = async (data) => {
        try {
            const response = await axios.post(`${BaseURL}/user/walletepurches`, {
                userId: Customer?._id,
                vendorId: vendorDetails?._id,
                StoresID: selectedShop,
                gold: CustomerGold,
                date: todatydate,
                ProductName: ProductName
            }, {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken"),
                }
            });
            if (response.status === 200) {
                alert("wallet remeded successfully");
                setStatus(false);
                setCloseModal(false)
                getWalletepurches()
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(error?.response?.data?.message);
        }
    };



    const totalAmount = Wallete?.reduce((a, b) => a + b.Amount, 0)
    const totalgold = Wallete?.reduce((a, b) => a + (b.Amount / b.goldRate), 0)

    console.log("Wallete", remedgold);

    return (
        <div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className="headertext">Customers Wallete</h3>
                    <div>
                        <Card className="p-2">
                            <Row>
                                <Col md={4}><h3 className="text1">{Customer?.name}</h3></Col>

                                <Col md={5}>
                                    <Row>
                                        <Col md={4}>Total Amount : </Col>
                                        <Col>{totalAmount}</Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>Total Gold :</Col>
                                        <Col>{totalgold?.toFixed(3)} gm</Col>
                                    </Row>
                                    <Row style={{ color: "red", fontWeight: "bold" }}>
                                        <Col md={4}>Remeded Gold :</Col>
                                        <Col>{remedgold?.toFixed(3)} gm</Col>
                                    </Row>
                                    <Row style={{ color: "green", fontWeight: "bold" }}>
                                        <Col md={4}>Remaining Gold :</Col>
                                        <Col>{(totalgold - remedgold)?.toFixed(3)} gm</Col>
                                    </Row>
                                </Col>
                                <Col md={2}>
                                    <Button variant="warning" onClick={handleShowremedModal} >
                                        Remed
                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                            <Card className="p-2">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Gold Rate</th>
                                            <th>PaymentID</th>
                                            <th>Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Wallete?.length > 0 ? (
                                            Wallete?.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item?.date}</td>
                                                    <td>{item?.Amount}</td>
                                                    <td>{item?.goldRate}</td>
                                                    <td>{item?.PaymentID}</td>
                                                    <td>
                                                        <FontAwesomeIcon
                                                            onClick={() => handleViewInvoice(item)}
                                                            icon={faEye}
                                                            className="editIcon"
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>

                        {/* Invoice Modal */}
                        <Modal
                            show={InvoiceModal}
                            onHide={() => {
                                setInvoiceModal(false);
                                setSelectedWalletItem(null);
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
                                {selectedWalletItem && (
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
                                                        {moment(selectedWalletItem?.date).format("DD-MM-YYYY")}
                                                    </p>
                                                </div>
                                                <div style={invoiceStyles.infoItem}>
                                                    <p style={invoiceStyles.label}>Invoice No:</p>
                                                    <p style={invoiceStyles.valueHighlight}>
                                                        {selectedWalletItem?._id?.slice(-10)}
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
                                                        {selectedWalletItem?.userId?.name || Customer?.name}
                                                    </span>
                                                </div>
                                                <div style={invoiceStyles.detailRow}>
                                                    <span style={invoiceStyles.detailLabel}>Mobile:</span>
                                                    <span style={invoiceStyles.detailValue}>
                                                        {selectedWalletItem?.userId?.phone || Customer?.phone}
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
                                                        {formatCurrency(selectedWalletItem?.Amount)}
                                                    </span>
                                                </div>
                                                <div style={invoiceStyles.summaryRow}>
                                                    <span style={invoiceStyles.summaryLabel}>Gold Converted (gm):</span>
                                                    <span style={invoiceStyles.summaryValueGold}>
                                                        {(selectedWalletItem?.Amount / selectedWalletItem?.goldRate)?.toFixed(3)} gm
                                                    </span>
                                                </div>
                                                <div style={invoiceStyles.divider} />
                                                <div style={invoiceStyles.summaryRow}>
                                                    <span style={invoiceStyles.summaryLabel}>Platform Fee:</span>
                                                    <span style={invoiceStyles.summaryValue}>
                                                        {formatCurrency(selectedWalletItem?.platformFee || 0)}
                                                    </span>
                                                </div>
                                                <div style={invoiceStyles.divider} />
                                                <div style={invoiceStyles.summaryRow}>
                                                    <span style={invoiceStyles.totalLabel}>Total Payable:</span>
                                                    <span style={invoiceStyles.totalValue}>
                                                        {formatCurrency(parseInt(selectedWalletItem?.Amount) + parseInt(selectedWalletItem?.PlatformFee || 0))}
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
                                        setSelectedWalletItem(null);
                                    }}
                                    variant="secondary"
                                >
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <Modal
                show={remedModal}
                onHide={() => setremedModal(false)}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Body>
                    <h3 className="headertext text-center">{Customer?.name} - {Customer?.phone}</h3>
                    <Card className="p-5" style={{ overflow: "hidden" }}>
                        <p>Enter the Gold customer want's to remed</p>
                        <input style={{ width: "50%", borderRadius: 10, padding: 5 }} placeholder="Enter Gold in gm" onChange={(e) => setCustomerGold(e.target.value)} />
                        <p style={{ marginTop: 30 }}>Enter Product Name</p>
                        <input style={{ width: "50%", borderRadius: 10, padding: 5 }} placeholder="Enter Product Name" onChange={(e) => setProductName(e.target.value)} />
                    </Card>
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => setremedModal(false)} variant="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => {
                            GenerateOtp();
                        }}
                    >
                        Send OTP
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal
                show={CloseModal}
                onHide={() => setCloseModal(false)}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Body>
                    <h3 className="headertext text-center">Verify OTP</h3>
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
                                    <button style={{ backgroundColor: "#4287f5", color: "white", border: "none", padding: "5px" }}
                                        onClick={() => handleSubmit(data)}
                                    >
                                        Verify OTP
                                    </button>
                                </Col>
                            </Row>
                            : (<>

                            </>)
                        }
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    {
                        Status ? <></> : (<>
                            <Button onClick={() => setCloseModal(false)} variant="secondary">
                                Cancel
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

export default CustomerWallete;