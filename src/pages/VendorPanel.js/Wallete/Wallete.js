import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseURL } from "../../../URL";
import moment from "moment";

function Wallete() {
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  const [CustomerList, setCustomerList] = useState([]);
  const [ShopList, setShopList] = useState([]);
  const [selectedShop, setselectedShop] = useState();
  const [InvestmentData, setInvestmentData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [search, setsearch] = useState("");
  const [Wallete, setWallete] = useState([]);
  const [selectedWalletItem, setSelectedWalletItem] = useState(null);
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );
  const [downloading, setDownloading] = useState(false);

  const [InvoiceModal, setInvoiceModal] = useState(false);

  useEffect(() => {
    if (ShopList?.length > 0) {
      setselectedShop(ShopList[0]?._id);
    }
  }, [ShopList]);

  useEffect(() => {
    if (vendorDetails) {
      getShopList();
    }
  }, [vendorDetails]);

  useEffect(() => {
    if (selectedShop) {
      getWallete();
    }
  }, [selectedShop]);

  const getShopList = async () => {
    try {
      const response = await axios.get(`${BaseURL}/Stores/getAllStores`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
      });
      if (response.status === 200) {
        setShopList(
          response?.data?.Stores?.filter(
            (item) =>
              item?.deleted === false &&
              item?.VendorID?._id == vendorDetails?._id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWallete = async () => {
    console.log("functioncalled");

    axios
      .get(`${BaseURL}/user/Wallete/StoresWallete/${selectedShop}`, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setWallete(response.data.Wallete);
          setfilterData(response.data.Wallete);
          const amt = response?.data?.Wallete?.reduce(
            (a, b) => a + parseInt(b.Amount),
            0
          );
        } else {
          console.error("Error fetching data:", response);
          setWallete([]);
          setfilterData([]);
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        setWallete([]);
        setfilterData([]);
      });
  };

  useEffect(() => {
    searchCustomers(search);
  }, [search, Wallete]);

  const searchCustomers = (searchText) => {
    if (!searchText || searchText.trim() === "") {
      setfilterData(Wallete);
      return;
    }

    const filteredData = Wallete?.filter((item) => {
      const searchLower = searchText.toLowerCase().trim();
      const nameMatch = item?.userId?.name?.toLowerCase().includes(searchLower);
      const phoneMatch = item?.userId?.phone?.toLowerCase().includes(searchLower);
      const paymentMatch = item?.PaymentID?.toLowerCase().includes(searchLower);
      const dateMatch = item?.date?.toLowerCase().includes(searchLower);
      const amountMatch = item?.Amount?.toString().includes(searchText);
      const goldRateMatch = item?.goldRate?.toString().includes(searchText);

      return (
        nameMatch || phoneMatch || paymentMatch || dateMatch || amountMatch || goldRateMatch
      );
    });

    setfilterData(filteredData);
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





  console.log("Wallete", Wallete);
  console.log("selectedShop", selectedShop);
  console.log("filterData", filterData);

  return (
    <div>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="container">
          <FirstNavbar />
          <h3 className="headertext">Wallete</h3>
          <div>
            <Card className="p-2">
              <div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall w-25 m-auto"
                    value={selectedShop}
                    onChange={(e) => setselectedShop(e.target.value)}
                  >
                    {ShopList?.map((shop) => (
                      <option key={shop._id} value={shop._id}>
                        {shop.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <hr />
              <Card className="p-2">
                <Row>
                  <Col md={6}>
                    <h3 className="text1">Wallete Payment</h3>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search by Name,Phone number, Date, Payment ID, Amount..."
                        size="sm"
                        name="search"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        autoComplete="off"
                        className="mb-3"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Phone Number</th>
                      <th>Amount</th>
                      <th>Gold Rate</th>
                      <th>PaymentID</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData?.length > 0 ? (
                      filterData.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item?.date}</td>
                          <td>{item?.userId?.name}</td>
                          <td>{item?.userId?.phone}</td>
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
                        <td colSpan="7" className="text-center">
                          {search ? "No results found" : "No data available"}
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
                            {selectedWalletItem?.userId?.name}
                          </span>
                        </div>
                        <div style={invoiceStyles.detailRow}>
                          <span style={invoiceStyles.detailLabel}>Mobile:</span>
                          <span style={invoiceStyles.detailValue}>
                            {selectedWalletItem?.userId?.phone}
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
                            {formatCurrency(parseInt(selectedWalletItem?.Amount) + parseInt(selectedWalletItem?.PlatformFee))}
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

export default Wallete;