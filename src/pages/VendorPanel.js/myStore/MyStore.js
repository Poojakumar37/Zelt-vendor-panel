import React, { useState, useEffect } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { toast } from "react-toastify";

import {
  Card,
  Row,
  Col,
  Figure,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import './mystore.css'

function MyStore() {
  const [vendorDetails, setvendorDetails] = useState();

  useEffect(() => {
    setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
  }, []);

  const [profileModal, setProfileModal] = useState(false);
  const handleCloseModal = () => setProfileModal(false);
  const handleShowModal = (e, shop) => {
    e.target.value === "add" ? setAction("add") : setAction("edit");

    setProfileModal(true);
    if (e.target.value === "add") {
      setLogo("");
      setLogoui("");
      setGSTImage("");
      setGSTImageui("");
      setStoreDetails({
        name: "",
        // description: "",
        email: "",
        phone: "",
        bankName: "",
        accNumber: "",
        ifsc: "",
        address: {
          city: "",
          zip: "",
        },
        gst: "",
      });
      setStoreDetailsError({
        name: "",
        // description: "",
        email: "",
        phone: "",
        bank: {
          bankName: "",
          accNumber: "",
          ifsc: "",
        },
        address: {
          city: "",
          zip: "",
        },
        gst: "",
      });
    } else {
      getEditData(shop);
      console.log(shop?._id);
      setStoreDetailsError({
        name: "",
        // description: "",
        email: "",
        phone: "",
        bankName: "",
        accNumber: "",
        ifsc: "",
        address: {
          city: "",
          zip: "",
        },
        gst: "",
      });
    }
  };

  const [StoreLogo, setStoreLogo] = useState();
  const [StoreLogoUri, setStoreLogoUri] = useState("");
  const [GSTImage1, setGSTImage1] = useState();
  const [GSTImage1uri, setGSTImage1uri] = useState("");
  const [name, setname] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [email, setemail] = useState();
  const [city, setcity] = useState();
  const [zip, setzip] = useState();
  const [GSTNumber, setGSTNumber] = useState();
  const [BankName, setBankName] = useState();
  const [AccountNumber, setAccountNumber] = useState();
  const [IFSCCode, setIFSCCode] = useState();


  const [EditModal, setEditModal] = useState(false);
  const [shopdetails, setshopdetails] = useState({})
  const handleCloseEditModal = () => setEditModal(false);
  const handleShowEditModal = (e, shop) => {
    setEditModal(true);
    setshopdetails(shop)
  }


  const [shopToUpdate, setShopToUpdate] = useState("");
  const [shopList, setShopList] = useState("");
  const [action, setAction] = useState("add");
  const [logo, setLogo] = useState("");
  const [logoui, setLogoui] = useState("");
  const [gstImage, setGSTImage] = useState("");
  const [gstImageui, setGSTImageui] = useState("");

  const [storeDetails, setStoreDetails] = useState({
    name: "",
    // description: "",
    email: "",
    phone: "",
    bankName: "",
    accNumber: "",
    ifsc: "",
    address: {
      city: "",
      zip: "",
    },
    gst: "",
  });

  const [storeDetailsError, setStoreDetailsError] = useState({
    name: "",
    // description: "",
    email: "",
    phone: "",
    bankName: "",
    accNumber: "",
    ifsc: "",
    address: {
      city: "",
      zip: "",
    },
    gst: "",
  });
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
        console.log("asfsdfsdf", response?.data?.Stores);
        const abc = response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id === vendorDetails?._id);
        setShopList(abc)
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

  const getEditData = async (shop) => {
    try {
      //  `http://localhost:3002/shop/list/${shop._id}`,
      const res = await axios.get(
        `https://zelt-product.moshimoshi.cloud/shop/list/${shop._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (res.status === 200) {
        setStoreDetails(res.data.data);
        setGSTImageui(res.data.data.gstImage);
        setGSTImage(res.data.data.gstImage);
        console.log(gstImageui, "hel");
        setLogoui(res.data.data.logo);
        setLogo(res.data.data.logo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setStoreDetails({ ...storeDetails, [name]: value });
    setStoreDetailsError({ ...storeDetailsError, [name]: "" });
  };

  console.log(storeDetails, "storesdjfgkjsdghdf");

  const addNewStore = async (storeDetails) => {
    const handelValidationObject = handelValidation();
    if (Object.keys(handelValidationObject).length > 0) {
      console.log("if working");
      setStoreDetailsError(handelValidationObject);
    } else {
      const formData = new FormData();
      formData.append("VendorID", vendorDetails?._id);
      formData.append("name", storeDetails.name);
      formData.append("email", storeDetails.email);
      formData.append("phoneNumber", storeDetails.phone);
      formData.append("GSTNumber", storeDetails.gst);
      formData.append("address", JSON.stringify(storeDetails.address));
      formData.append("BankName", storeDetails.bankName);
      formData.append("AccountNumber", storeDetails.accNumber);
      formData.append("IFSCCode", storeDetails.ifsc);
      formData.append("StoreLogo", logo);
      formData.append("GSTImage", gstImage);
      console.log(formData);
      const data = await axios
        .post(`http://localhost:3001/api/Stores/CreateStores`, formData, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .catch((error) => {
          console.log("error ==>", error);
        });
      if (data.status === 200) {
        toast.success("New Store Added", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        handleCloseModal();
        getShopList();
      }
    }
  };


  const editStore = async (storeDetails) => {
    const formData = new FormData();
    try {
      formData.append("name", name ? name : storeDetails.name);
      formData.append("email", email ? email : storeDetails.email);
      formData.append("phoneNumber", phoneNumber ? phoneNumber : storeDetails.phoneNumber);
      formData.append("GSTNumber", GSTNumber ? GSTNumber : storeDetails.GSTNumber);
      formData.append("city", city ? city : storeDetails.address?.city);
      formData.append("zip", zip ? zip : storeDetails.address?.zip);
      formData.append("BankName", BankName ? BankName : storeDetails?.BankName);
      formData.append("AccountNumber", AccountNumber ? AccountNumber : storeDetails?.AccountNumber);
      formData.append("IFSCCode", IFSCCode ? IFSCCode : storeDetails?.IFSCCode);
      formData.append("storeId", storeDetails?._id);
      formData.append("StoreLogo", StoreLogo ? StoreLogo : storeDetails?.StoreLogo);
      formData.append("GSTImage", GSTImage1 ? GSTImage1 : storeDetails?.GSTImage);

      const response = await axios.patch(`http://localhost:3001/api/Stores/editStores`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      });

      console.log("Store updated ===> ", response);

      if (response?.status === 200) {
        toast.success("Details updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        handleCloseEditModal();
        getShopList();
      }
    } catch (error) {
      console.log("error", error);

      // Handle API response errors
      if (error.response) {
        const { message, error: isError, jwtExpired } = error.response.data;
        console.log("asfsd", message, error, jwtExpired);

        if (jwtExpired) {
          alert("Session expired! Please log in again.");
          // Redirect to login page
          // window.location.href = "/"; // Or use useNavigate() if using React Router
        } else {
          toast.error(message || "An error occurred!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
          });
        }
      } else {
        alert("Network error! Please try again later.");
      }
    }
  };


  const deleteStores = async (id) => {
    if (window.confirm("Are you sure you want to delete...?")) {
      const data = await axios
        .patch(`http://localhost:3001/api/Stores/deleteStores/${id}`, {}, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .catch((error) => {
          console.log("error ==>", error);
        });
      console.log("store updated  ===> ", data);
      if (data.status === 200) {
        toast.success("Stored deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        getShopList();
      }
    }
  };

  const handelValidation = () => {
    const newErrors = {};

    const { zip, city } = storeDetails.address;
    // const { bankName, ifsc, accNumber } = storeDetails.bank;

    const { description, email, gst, name, owner, phone, bankName, accNumber, ifsc } = storeDetails;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // const nameRegex = /^[a-zA-Z\s]{1,}[\.]{0,1}[a-zA-Z\s]{0,}$/;
    const accNumberRegex = /^\d{16}$/;
    const gstNumberRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
    // const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    if (name === "") {
      newErrors.name = "please enter name";
    }

    if (email === "") {
      newErrors.email = "please enter a valid email address";
    }
    if (accNumber === "") {
      newErrors.accNumber = "please enter a valid account number ";
    }

    if (bankName === "") {
      newErrors.bankName = "please enter a Bank Name";
    }
    // if (description === "") {
    //   newErrors.description = "please add description";
    // }

    if (gst === "") {
      newErrors.gst = "please enter a valid gst number";
    }
    if (ifsc === "") {
      newErrors.ifsc = "please enter a valid  IFSC code ";
    }
    if (owner === "") {
      newErrors.owner = "please enter a owner Name";
    }

    if (phone === '') {
      newErrors.phone = "please enter a valid phone number";
    }
    if (city === "") {
      newErrors.city = "please enter the city";
    }
    if (zip === "") {
      newErrors.zip = "please enter the zip";
    }
    if (logo === "") {
      newErrors.logo = "please upload store logo";
    }
    if (gstImage === "") {
      newErrors.gstImage = "please Upload GST certificate";
    }

    return newErrors;
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
          <h3 className="headertext">Stores</h3>

          <div>
            <Card className="p-2" style={{ width: "100%", overflowX: "auto" }}>
              <Row>
                <Col md={3}>
                  <h3 className="headertext">My Stores</h3>
                </Col>
                <Col md={7}>
                  <div className="w-100 d-flex justify-content-end">
                    <Button

                      variant="warning"
                      value="add"
                      onClick={(e) => handleShowModal(e)}
                    >
                      Add new Store
                    </Button>
                  </div>
                </Col>
              </Row>

              <Card
                className="p-2"
                style={{ width: "100%", overflowX: "auto" }}
              >
                {/* <hr /> */}
                <h3 className="text1">Available stores</h3>
                <Table striped bordered hover style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Store Image</th>
                      <th>Store Name</th>
                      <th>City</th>
                      <th>ZIP</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      {/* <th> Gst Image</th> */}
                      {/* <th>description</th> */}
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopList &&
                      shopList.map((shop, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <Figure>
                              <Figure.Image
                                width={50}
                                height={50}
                                alt="Image"
                                src={shop.StoreLogo}
                              />
                            </Figure>
                          </td>
                          <td>{shop.name}</td>

                          <td>{shop.address?.city}</td>
                          <td>{shop.address?.zip}</td>
                          <td>{shop.phoneNumber}</td>
                          <td>{shop.email}</td>

                          {/* <td>
                            {" "}
                            <Figure>
                              <Figure.Image
                                width={100}
                                height={100}
                                alt="GST"
                                src={shop.gstImage}
                              />
                            </Figure>
                          </td> */}
                          {/* <td>{shop.description}</td> */}

                          <td>
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="editIcon"
                              value="edit"
                              onClick={(e) => {
                                setShopToUpdate(shop._id);
                                handleShowEditModal(e, shop);
                              }}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="editIcon"
                              style={{ color: "red" }}
                              value="edit"
                              onClick={(e) => {
                                deleteStores(shop._id);
                              }}
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
        show={profileModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className="headertext text-center">Add Store Details</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Store Name"
                  size="sm"
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                  className="mb-3"
                  value={storeDetails?.name}
                />

                <span className="text-danger">{storeDetailsError?.name}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  maxLength={10}
                  type="text"
                  placeholder="Enter GST Number"
                  size="sm"
                  name="gst"
                  onChange={handleChange}
                  autoComplete="off"
                  className="mb-3"
                  value={storeDetails?.gst}
                />
                <span className="text-danger">{storeDetailsError?.gst}</span>
              </Form.Group>
            </Col>
            {/* kdk/ */}
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number"
                  size="sm"
                  name="phone"
                  value={storeDetails?.phone}
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,10}$/; // Allow only numbers and up to 10 digits
                    if (regex.test(input)) {
                      setStoreDetails({
                        ...storeDetails,
                        phone: input,
                      });
                    }
                  }}
                  autoComplete="off"
                  className="mb-3 number-input"
                />
                <span className="text-danger">{storeDetailsError?.phone}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Bank Name"
                  size="sm"
                  name="bankName"
                  value={storeDetails?.bankName}
                  onChange={(e) => {
                    setStoreDetails({
                      ...storeDetails,
                      bankName: e.target.value,
                    });
                    setStoreDetailsError({
                      ...storeDetailsError,
                      accNumber: "",
                    });
                  }}
                  autoComplete="off"
                  className="mb-3"
                />
                <span className="text-danger">
                  {storeDetailsError?.bankName}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="email"
                  placeholder="Enter Email Id"
                  size="sm"
                  name="email"
                  onChange={handleChange}
                  autoComplete="off"
                  className="mb-3"
                  value={storeDetails?.email}
                />
                <span className="text-danger">{storeDetailsError?.email}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  maxLength={15}
                  type="number"
                  placeholder="Enter Account Number"
                  size="sm"
                  name="accNumber"
                  autoComplete="off"
                  className="mb-3 number-input"
                  value={storeDetails?.accNumber}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (/^\d{0,17}$/.test(inputValue)) {

                      setStoreDetails({
                        ...storeDetails,
                        accNumber: inputValue,
                      });
                      setStoreDetailsError({
                        ...storeDetailsError,
                        accNumber: "",

                      });
                    }
                  }}
                />
                <span className="text-danger">
                  {storeDetailsError?.accNumber}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter City"
                  size="sm"
                  name="city"
                  value={storeDetails?.address?.city}
                  onChange={(e) => {
                    setStoreDetails({
                      ...storeDetails,
                      address: {
                        ...storeDetails.address,
                        city: e.target.value,
                      },
                    });
                    setStoreDetailsError({
                      ...setStoreDetailsError,
                      address: {
                        city: "",
                        zip: "",
                      },
                    });
                  }}
                  autoComplete="off"
                  className="mb-3"
                />
                <span className="text-danger">{storeDetailsError?.city}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  maxLength={11}
                  type="text"
                  placeholder="Enter IFSC Code"
                  size="sm"
                  name="ifsc"
                  value={storeDetails?.ifsc}
                  onChange={(e) => {
                    setStoreDetails({
                      ...storeDetails,
                      ifsc: e.target.value,
                    });
                    setStoreDetailsError({
                      ...storeDetailsError,
                      ifsc: "",
                    });
                  }}
                  autoComplete="off"
                  className="mb-3"
                />
                <span className="text-danger">{storeDetailsError?.ifsc}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ZIPCODE</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP"
                  size="sm"
                  name="zip"
                  value={storeDetails?.address?.zip}
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,6}$/; // Allow only numbers and up to 6 digits
                    if (regex.test(input)) {
                      setStoreDetails({
                        ...storeDetails,
                        address: {
                          ...storeDetails.address,
                          zip: input,
                        },
                      });
                      setStoreDetailsError({
                        ...storeDetailsError,
                        address: {
                          city: "",
                          zip: "",
                        },
                      });
                    }
                  }}
                  autoComplete="off"
                  className="mb-3 number-input"
                />
                <span className="text-danger">{storeDetailsError?.zip}</span>
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  onChange={handleChange}
                  autoComplete="off"
                  maxLength={50}
                  size="sm"
                  className="mb-3"
                  height="100px"
                  value={storeDetails?.description}
                />
                <span className="text-danger">
                  {storeDetailsError?.description}
                </span>
              </Form.Group>
            </Col> */}
          </Row>
          <Row></Row>

          <Row>
            <Row>
              {gstImage === "" ? null : (
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x1801"
                    src={gstImageui}
                  />
                </Figure>
              )}
            </Row>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select GST Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select GST Image"
                  className="mb-3"
                  // className="w-50"
                  name="gstImage"
                  onChange={(e) => {
                    setGSTImage(e.target.files[0]);
                    setGSTImageui(URL.createObjectURL(e.target.files[0]));
                  }}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {storeDetailsError?.gstImage}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Row>
              {logo === "" ? null : (
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x180"
                    src={logoui}
                  // onChange={}
                  />
                </Figure>
              )}
            </Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select Store Logo</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Store Logo"
                  className="mb-3"
                  // className="w-50"
                  name="logo"
                  onChange={(e) => {
                    setLogo(e.target.files[0]);
                    setLogoui(URL.createObjectURL(e.target.files[0]));
                  }}
                  autoComplete="off"
                />
                <span className="text-danger">{storeDetailsError?.logo}</span>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <Button variant="warning" onClick={editLogo}>Update</Button>
            </Col>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              console.log("action ====>", action);
              action === "add"
                ? addNewStore({ ...storeDetails })
                : editStore({ ...storeDetails });
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={EditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className="headertext text-center">Edit Store Details</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={shopdetails?.name}
                  size="sm"
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  maxLength={10}
                  type="text"
                  placeholder={shopdetails?.GSTNumber}
                  size="sm"
                  name="gst"
                  onChange={(e) => setGSTNumber(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />

              </Form.Group>
            </Col>
            {/* kdk/ */}
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={shopdetails?.phoneNumber}
                  size="sm"
                  name="phone"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,10}$/; // Allow only numbers and up to 10 digits
                    if (regex.test(input)) {
                      setphoneNumber(input);
                    }
                  }}
                  autoComplete="off"
                  className="mb-3 number-input"
                />

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={shopdetails?.BankName}
                  size="sm"
                  name="bankName"
                  onChange={(e) => setBankName(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />

              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="email"
                  placeholder={shopdetails?.email}
                  size="sm"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  maxLength={15}
                  type="number"
                  placeholder={shopdetails?.AccountNumber}
                  size="sm"
                  name="accNumber"
                  autoComplete="off"
                  className="mb-3 number-input"
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (/^\d{0,17}$/.test(inputValue)) {
                      setAccountNumber(e.target.value)
                    }
                  }}
                />

              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={shopdetails?.address?.city}
                  size="sm"
                  name="city"
                  onChange={(e) => setcity(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  maxLength={11}
                  type="text"
                  placeholder={shopdetails?.IFSCCode}
                  size="sm"
                  name="ifsc"
                  onChange={(e) => setIFSCCode(e.target.value)}
                  autoComplete="off"
                  className="mb-3"
                />

              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ZIPCODE</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={shopdetails?.address?.zip}
                  size="sm"
                  name="zip"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,6}$/; // Allow only numbers and up to 6 digits
                    if (regex.test(input)) {
                      setzip(input)
                    }
                  }}
                  autoComplete="off"
                  className="mb-3 number-input"
                />

              </Form.Group>
            </Col>

          </Row>
          <Row></Row>

          <Row>
            <Row>
              {GSTImage1 ? (
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x1801"
                    src={GSTImage1uri}
                  />
                </Figure>
              )
                :
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x1801"
                    src={shopdetails?.GSTImage}
                  />
                </Figure>
              }
            </Row>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select GST Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder={shopdetails?.GSTImage}
                  className="mb-3"
                  // className="w-50"
                  name="gstImage"
                  onChange={(e) => {
                    setGSTImage1(e.target.files[0]);
                    setGSTImage1uri(URL.createObjectURL(e.target.files[0]));
                  }}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {storeDetailsError?.gstImage}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Row>
              {StoreLogo ? (
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x1801"
                    src={StoreLogoUri}
                  />
                </Figure>
              )
                :
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x1801"
                    src={shopdetails?.StoreLogo}
                  />
                </Figure>
              }

            </Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select Store Logo</Form.Label>
                <Form.Control
                  type="file"
                  placeholder={shopdetails?.StoreLogo}
                  className="mb-3"
                  // className="w-50"
                  name="logo"
                  onChange={(e) => {
                    setStoreLogo(e.target.files[0]);
                    setStoreLogoUri(URL.createObjectURL(e.target.files[0]));
                  }}
                  autoComplete="off"
                />
                <span className="text-danger">{storeDetailsError?.logo}</span>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <Button variant="warning" onClick={editLogo}>Update</Button>
            </Col>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseEditModal} variant="secondary">
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              editStore(shopdetails);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyStore;