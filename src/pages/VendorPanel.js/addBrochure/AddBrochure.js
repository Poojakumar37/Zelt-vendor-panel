import React, { useState } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import {
  Card,
  Row,
  Col,
  Figure,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BaseURL } from "../../../URL";

const image = require("../../../assets/imagesCustomer/image.png");

function AddBrochure() {
  const [jewelleryModal, setJewelleryModal] = useState(false);
  const [coinModal, setCoinModal] = useState(false);
  const [selection, setSelection] = useState("1");

  const handleCloseModal = () => setJewelleryModal(false);
  const handleShowModal = () => setJewelleryModal(true);

  const handleCloseModal1 = () => setCoinModal(false);
  const handleShowModal1 = () => setCoinModal(true);

  const onGoldSelect = (e) => {
    setSelection(e.target.value);
  };

  const [brochureList, setBrochureList] = useState([]);

  const [allList, setAllList] = useState([]);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [ShopList, setShopList] = useState([])
  const [SeletedShop1, setSeletedShop1] = useState()
  const [SeletedShop, setSeletedShop] = useState()
  const [vendorDetails, setvendorDetails] = useState();

  useEffect(() => {
    setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
  }, []);


  useEffect(() => {
    if (ShopList?.length > 0) {
      setSeletedShop1(ShopList[0]?._id)
    }
  }, [ShopList])

  const [shopId] = useState(localStorage.getItem("shopId"));


  const addBrochure = async () => {
    if (!SeletedShop) {
      alert("please select Shop")
    }
    else if (!file) {
      alert("please select PDF")
    } else {
      const formData = new FormData();
      formData.append("Image", file);
      formData.append("Title", title);
      formData.append("StoreID", SeletedShop);
      formData.append("VendorID", vendorDetails?._id);
      const data = await axios.post(
        `${BaseURL}/Vendor/createBrochures`,
        formData,
        {
          headers: { "x-access-Token": localStorage.getItem("accessToken") },
        }
      );
      console.log(data);
      if (data.status === 200) {
        alert("Brochure added successfully")
        handleCloseModal()
        getBrochure();
      }
    }
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }



  const getShopList = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/Stores/getAllStores`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        console.log(response?.data?.Stores);
        setShopList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id === vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (vendorDetails) {
      getShopList();
    }
  }, [vendorDetails]);


  useEffect(() => {

    if (vendorDetails && SeletedShop1) {
      getBrochure();
    }
  }, [vendorDetails, SeletedShop1]);

  const getBrochure = async () => {
    try {
      const data = await axios.get(
        `${BaseURL}/Vendor/getAllBrochures`
      );
      console.log("asfsdf", data.data.Brochures);
      setBrochureList(data.data.Brochures?.filter((item) => item?.deleted == false && item?.VendorID?._id == vendorDetails?._id && item?.StoreID?._id == SeletedShop1));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("vendorDetails", vendorDetails);


  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className="headertext">Brochures</h3>
          <div>
            <Card className="p-2">
              <Row>
                <Col md={4}>
                  <h3 className="headertext">Manage Brochures</h3>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <InputGroup className="w-250">
                    <InputGroup.Text>Select Shop</InputGroup.Text>
                    <Form.Select
                      aria-label="Select Shops"
                      size={"sm"}
                      onChange={(e) => setSeletedShop1(e.target.value)}

                    >
                      {/* <option>Select</option> */}
                      {
                        ShopList?.map(shop => (
                          <option value={shop._id}>{shop.name}</option>
                        ))
                      }
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Button variant="warning" onClick={handleShowModal}>
                    Upload new Brochures
                  </Button>
                </Col>
              </Row>
              <hr />
              <Card className="p-2">
                <h3 className="text1">Available Brochures</h3>

                <div className="row mt-3">
                  {brochureList
                    ? brochureList.map((ele) => (
                      <div className="col-md-4 ">
                        <div className="row border p-3 my-2  mx-2">
                          <div className="col-md-6">
                            <p className="m-auto mt-1"> {ele.Title}</p>
                          </div>
                          <div className="col-md-6">
                            <a
                              href={ele.Image}
                              download
                              target="_blank"
                              className="downloadPdf btn btn-danger text-white"
                            >
                              download
                            </a>
                          </div>
                        </div>
                        <p></p>
                      </div>
                    ))
                    : "  "}
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        show={jewelleryModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className="headertext text-center">Upload Brochure</h4>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="w-50">
                <Form.Label className="mt-3">Select Shop</Form.Label>
                <Form.Select
                  aria-label="Select Shops"
                  size={"sm"}
                  onChange={(e) => setSeletedShop(e.target.value)}
                >
                  <option>Select</option>
                  {
                    ShopList?.map(shop => (
                      <option value={shop._id}>{shop.name}</option>
                    ))
                  }

                </Form.Select>

                <Form.Label className="mt-3">Add Brochure PDF</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  placeholder="Brochure PDF"
                  className="mb-3"
                  name="file"
                  onChange={(e) => {
                    console.log("FILE---->", e.target.files[0])
                    setFile(e.target.files[0])
                  }}
                  autoComplete="off"
                />
                <Form.Control
                  type="text"
                  placeholder="Brochure Title"
                  className="mb-3"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={addBrochure}>
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
        <h4 className="headertext text-center">
          Brochure of Sri Vinayaka Jewellers
        </h4>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal1} variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddBrochure;