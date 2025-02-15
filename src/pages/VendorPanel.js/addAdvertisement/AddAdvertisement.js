import React, { useEffect, useState } from "react";
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
  InputGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AuthServices from "../../authServices/AuthServices";
import "./Addavt.css";
import { ToastContainer, toast, Zoom } from "react-toastify";

const image = require("../../../assets/imagesCustomer/image.png");

function AddAdvertisement() {
  const [jewelleryModal, setJewelleryModal] = useState(false);
  const [coinModal, setCoinModal] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    name: "",
    description: "",
    image: "",
    store: "",
  });
  const [input, setInput] = useState({ name: "", description: "", store: "" });
  const [imagesData, setImagesData] = useState("");
  const [selectedAd, setSelectedAd] = useState();
  const [selectedShop, setSelectedShop] = useState();
  const [advert, setAdvert] = useState([]);
  const [loader, setLoader] = useState(false);
  const [ShopList, setShopList] = useState([])
  const [SeletedShop1, setSeletedShop1] = useState(ShopList[0]?._id)
  const [SeletedShop, setSeletedShop] = useState()
  const [vendorDetails, setvendorDetails] = useState();


  useEffect(() => {
    if (ShopList?.length > 0) {
      setSeletedShop1(ShopList[0]?._id)
    }
  }, [ShopList])

  useEffect(() => {
    setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
  }, []);

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


  const handleCloseModal = () => setJewelleryModal(false);
  const handleShowModal = () => setJewelleryModal(true);

  const handleCloseModal1 = () => setCoinModal(false);
  const handleShowModal1 = (advert) => {
    setCoinModal(true);
    setSelectedAd(advert);
  };
  const [displayadvt, setAdvt] = useState([]);

  const handleStoreChange = (e) => {
    console.log("shop eeeee ==>", e.target.value);
    setInput({ ...input, store: e.target.value });
  };

  const handleStoreChange1 = (e) => {
    console.log("shop1 eeeee ==>", e.target.value);
    // setInput({ ...input, store: e.target.value })
    setSelectedShop(e.target.value);
  };


  const handleChange = (e) => {
    setInput({
      ...input,
      [e?.target?.name]: e?.target?.value,
      [e.target.description]: e.target.value,
    });

    setInputErrors({
      ...inputErrors,
      [e.target.name]: null,
      [e.target.description]: null,
      [e.target.image]: null,
    });
  };
  const handleValidation = () => {
    const { name, description, store } = input;
    const newErrors = {};
    if (!imagesData) {
      newErrors.image = "Please upload an image";
    }
    if (name == "") {
      newErrors.name = "Please enter heading";
    }
    if (description == "") {
      newErrors.description = "Please enter description";
    }
    return newErrors;
  };

  const uploadAdvertisement = async () => {
    try {
      const handleValidationObject = handleValidation();
      console.log(handleValidationObject);
      if (Object.keys(handleValidationObject).length > 0) {
        setInputErrors(handleValidationObject);
      } else if (!SeletedShop) {
        alert("Please select store")
      } else {
        const formData = new FormData();
        formData.append("StoreID", SeletedShop);
        formData.append("VendorID", vendorDetails?._id);
        formData.append("Heading", input?.name);
        formData.append("Description", input?.description);
        formData.append("Image", imagesData);
        const profileData = await axios.post(
          `http://localhost:3001/api/Advertisement/createAdvertisement`,
          formData,
          {
            headers: { "x-access-Token": localStorage.getItem("accessToken") },
          }
        );
        console.log("profileData", profileData);
        if (profileData?.status === 200) {
          setInput({
            ...input,
            name: "",
            description: "",
            shop: "",
          });

          toast.success("Created Successfully");

          setLoader(false);

          setImagesData();
          getAdvertisement();
          handleCloseModal();
        }
      }
    } catch (e) {
      console.log("error ===> ", e);
    }
  };

  const deleteBanner = async (id) => {
    try {
      console.log("selectedShop?.owner", selectedShop);
      const profileData = await AuthServices?.deleteDataProduct(
        `/shop/advert/${selectedShop}?advertId=${selectedAd?._id}`
      );
      if (profileData?.error === false) {
        getAdvertisement();
        handleCloseModal1();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAdvertisement = async () => {
    try {
      const data = await axios.get(
        `http://localhost:3001/api/Advertisement/getAllAdvertisement`
      );
      console.log("asfsdf", data.data.Advertisement, SeletedShop1, vendorDetails?._id);
      setAdvert(data.data.Advertisement?.filter((item) => item?.VendorID?._id == vendorDetails?._id && item?.StoreID?._id == SeletedShop1 && item?.deleted == false));
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    if (SeletedShop1) {
      getAdvertisement();
    }
  }, [SeletedShop1]);


  const countByStatus = (status) =>
    advert?.reduce((count, item) => {
      if (item.Status === status) {
        count++;
      }
      return count;
    }, 0);

  const approvedCount = countByStatus("Approved");
  const pendingCount = countByStatus("Pending");

  console.log("advert", advert);

  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className="headertext">Add Advertisement</h3>
          <InputGroup className="w-25">
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
          <div style={{ marginTop: 15 }}>
            <Card className="p-2">
              <Row>
                <Col md={4}>
                  <h3 className="headertext">Manage Advertisement</h3>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Button style={{ marginBottom: 15 }} variant="warning" onClick={handleShowModal}>
                    Upload new Banner
                  </Button>
                </Col>
              </Row>


              <Card className="p-4">
                <div className="Bannercontent-flex">
                  <h3 className="text1">Approved Advertisement</h3>
                  <p>
                    {" "}
                    <b> Total Count :- {approvedCount} </b>{" "}
                  </p>
                </div>
                <Table striped bordered hover size="sm">
                  <thead>
                    <div class="row striped bordered hover">
                      <div className="col font-weight-bold">S.No.</div>
                      <div className="col font-weight-bold">Status</div>

                      <div className="col font-weight-bold">Name</div>

                      <div class="col-1 font-weight-bold">

                        Image
                      </div>
                    </div>
                  </thead>

                  <tbody>
                    {advert
                      ?.filter((ele) => ele.Status == "Approved")
                      .map((e, index) => (
                        <div class="row striped bordered hover">
                          <div className="col">{index + 1}</div>
                          <div className="col">{e?.Status}</div>

                          <div className="col">{e?.Heading}</div>

                          <div class="col-1 pr-2">

                            <img className="img-fluid img-size" src={e?.Image} alt="img" />
                          </div>
                        </div>
                      ))}
                  </tbody>
                </Table>
              </Card>

              <Card className="p-4 mt-5">
                <div className="Bannercontent-flex">
                  <h3 className="text1">Pending Advertisement</h3>
                  <p>
                    {" "}
                    <b> Total Count :- {pendingCount} </b>{" "}
                  </p>
                </div>
                <Table striped bordered hover size="sm">
                  <div class="row striped bordered hover">
                    <div className="col font-weight-bold">S.No.</div>
                    <div className="col font-weight-bold">Status</div>

                    <div className="col font-weight-bold">Name</div>

                    <div class="col-1 font-weight-bold">

                      Image
                    </div>
                  </div>
                  <tbody>
                    {advert
                      ?.filter((ele) => ele.Status == "Pending")
                      .map((e, index) => (
                        <div class="row striped bordered hover">
                          <div className="col shift">{index + 1}</div>
                          <div className="col">{e?.Status}</div>

                          <div className="col shift">{e?.Heading}</div>

                          <div class="col-1 pr-2">

                            <img className="img-fluid" src={e?.Image} alt="img" />
                          </div>
                        </div>
                      ))
                    }
                  </tbody>
                </Table>
              </Card>

            </Card>
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
          <h4 className="headertext text-center">Upload Advertisements Image</h4>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Store:</Form.Label>
                  <div className="leftedge d-flex justify-content-space">
                    <Form.Select
                      aria-label="Default select example"
                      size={"sm"}
                      className="selectsizesmall"
                      onChange={(e) => setSeletedShop(e.target.value)}
                    >
                      <option >Select</option>
                      {
                        ShopList?.map(shop => (
                          <option value={shop._id}>{shop.name}</option>
                        ))
                      }
                    </Form.Select>
                  </div>
                  <span className="text-danger">{inputErrors?.store}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="w-50">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Advertisements Title"
                    className="mb-3"
                    name="name"
                    onChange={handleChange}
                    autoComplete="off"
                    value={input?.name}
                  />
                </Form.Group>
                <span className="text-danger">{inputErrors?.name}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="w-50">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Advertisements Description"
                    as="textarea"
                    className="mb-3"
                    name="description"
                    onChange={handleChange}
                    autoComplete="off"
                    value={input?.description}
                  />
                </Form.Group>
                <span className="text-danger">{inputErrors?.description}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="w-50">
                  <Form.Label>Advertisements Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Advertisements Image"
                    className="mb-3"
                    name="file"
                    onChange={(e) => setImagesData(e.target.files[0])}
                    autoComplete="off"
                  />
                </Form.Group>
                <span className="text-danger">{inputErrors?.image}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="warning" onClick={uploadAdvertisement}>
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
          <h4 className="headertext text-center">Advertisement </h4>
          <Modal.Body>
            <Row>
              <Col>
                <p className="headertext1">Heading:</p>
                <p className="headertext">{selectedAd?.name}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="headertext1">Description:</p>
                <p className="headertext">{selectedAd?.description}</p>
              </Col>
            </Row>
            <Row>
              <Figure>
                <Figure.Image width={500} height={600} src={selectedAd?.image} />
              </Figure>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={deleteBanner} variant="warning">
              Delete
            </Button>
            <Button onClick={handleCloseModal1} variant="secondary">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AddAdvertisement;
