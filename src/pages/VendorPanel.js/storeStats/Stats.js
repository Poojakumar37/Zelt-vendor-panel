import React, { useEffect, useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form, InputGroup } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Chart } from "react-google-charts";
import moment from 'moment'


const image = require('../../../assets/imagesCustomer/image.png');

function Stats() {
  const [jewelleryModal, setJewelleryModal] = useState(false)
  const [coinModal, setCoinModal] = useState(false)
  const navigate = useNavigate();
  const [brochureReqsData, setBrochureReqsData] = useState([])
  const handleCloseModal = () => setJewelleryModal(false)
  const handleShowModal = () => setJewelleryModal(true)

  const handleCloseModal1 = () => setCoinModal(false)
  const handleShowModal1 = () => setCoinModal(true)

  const [data, setData] = useState([]);
  const [SchemesSold, setSchemesSold] = useState([])
  const [ShopList, setShopList] = useState([])
  const [selectedShop, setselectedShop] = useState()
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );


  useEffect(() => {
    if (ShopList?.length > 0) {
      setselectedShop(ShopList[0]?._id)
    }
  }, [ShopList])

  useEffect(() => {
    if (vendorDetails) {
      getShopList()
    }
  }, [vendorDetails])

  useEffect(() => {
    if (selectedShop) {
      investData()
    }
  }, [selectedShop])




  const getShopList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Stores/getAllStores",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        setShopList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const investData = () => {
    axios.get(`http://localhost:3001/api/user/getSchemeOrderStoresID/${selectedShop}`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log("API Response:", response.data.SchemeOrder);  // Check the API data
        setSchemesSold(response.data.SchemeOrder);
      } else {
        console.error("Error fetching data:", response);
        setSchemesSold([]);  // Ensure state updates
      }
    }).catch((error) => {
      console.error("Axios Error:", error);
      setSchemesSold([]);
    });
  };



  useEffect(() => {
    if (SchemesSold?.length > 0) {
      const filteredSchemes = SchemesSold.filter(item => {
        const startDate = moment(item?.StartDate);
        return startDate.isSameOrAfter(moment().subtract(7, 'days'), 'day');
      });

      if (filteredSchemes.length > 0) {
        const formattedData = filteredSchemes.map(item => {
          // const dateP = moment(item?.StartDate).format("DD-MM-YYYY");
          // const dateParts = dateP.split('-');
          // const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0].substring(2)}`;
          const formattedDate = moment(item?.StartDate).format("DD/MM/YYYY");
          return [formattedDate, item?.Investment[0]?.Amount];
        });

        const chartData = [["Year", "Sales"], ...formattedData];
        setData(chartData);

        console.log(chartData, "chartData");
      }
    } else {
      setData([])
    }
  }, [SchemesSold]);




  const option = {
    title: "Chart showing Schemes sold in last 7 days",
    curveType: "function",
    legend: { position: "bottom" },
    chartEvents: [
      {
        eventName: "ready",
        callback: ({ chartWrapper }) => {
          const chart = chartWrapper.getChart();
          console.log("Callback triggered");
          chart.container.style.backgroundColor = "lightgrey"; // Set your desired background color
        },
      },
    ],
  };


  console.log("SchemesSold", SchemesSold);

  return (
    <div>

      <div className='' style={{ marginTop: 15 }}>
        <Card className='p-2 '>
          <div>
            {/* <h6 className="text ">Live Rate</h6> */}
            <div
              style={{
                display: "flex",
              }}
            >
              {/* <p>{liveRate}</p> */}
              <Form.Select
                aria-label="Default select example"
                size={"sm"}
                className="selectsizesmall w-25 m-auto"
                onChange={(e) => setselectedShop(e.target.value)}
                defaultValue={localStorage.getItem("shopId")} // Set the default value here
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
          <Row>
            <Col md={4}>
              <h3 className='headertext'>Schemes Sold</h3>
            </Col>
            <Col md={4}>
              <Button onClick={() => navigate('/SchemesSold')} variant="warning">View More</Button>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              {data?.length > 0 ?
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={data}
                  options={option}
                /> : <p>No Schemes sold in last 7 days</p>}
            </Col>
          </Row>
          {/* <hr /> */}
          {/* <Row>
            <Col md={4}>
              <h3 className='headertext'>Brochure Requests</h3>
            </Col>
            <Col md={3}>
              <Button onClick={() => navigate('/BrochureRequest')} variant="warning">View More</Button>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <h1 style={{}}>
                  {brochureReqsData?.length}
                </h1>
              </div>
            </Col>
          </Row> */}
          <hr />

        </Card>
      </div>
      <Modal
        show={jewelleryModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Add/Edit Admin Details</h4>
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
                    {/* <option >Select Store</option> */}
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
                    {/* <option >Select Payment Option</option> */}
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
      </Modal>
      <Modal
        show={coinModal}
        onHide={handleCloseModal1}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Add/Edit Bar/Coins</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Check
                inline
                label="Bar"
                name="group1"
                type="radio"
              />
              <Form.Check
                inline
                label="Coin"
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
                <Form.Label>Select Store</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={() => { }}
                  >
                    {/* <option >Select Store</option> */}
                    <option value="1">Sri Vinayaka Jewellers, Mumbai</option>
                    <option value="2">Sri Vinayaka Jewellers, Bengalore</option>
                    <option value="3">Sri Vinayaka Jewellers, Jay Nagar</option>
                    <option value="4">Sri Vinayaka Jewellers, JP Nagar</option>
                    <option value="5">Sri Vinayaka Jewellers, Delhi</option>
                    <option value="6">Sri Vinayaka Jewellers, KR Market</option>
                    <option value="7">Sri Vinayaka Jewellers, Mangalore</option>
                  </Form.Select>
                </div>
                <span className="text-danger">{ }</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Model</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Model"
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
                <Form.Label>Enter Packaging</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Packaging"
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
                <Form.Label>Select Payment Option</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={() => { }}
                  >
                    {/* <option >Select Payment Option</option> */}
                    <option value="1">Offline</option>
                    <option value="2">Online</option>
                  </Form.Select>
                </div>
                <span className="text-danger">{ }</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Admin Image"
                  className="w-50"
                  name="image"
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button variant="warning">Update</Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal1} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default Stats