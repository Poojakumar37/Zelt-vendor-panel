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
} from "react-bootstrap";
import Plot from "react-plotly.js";
import axios from "axios";
import { toast } from "react-toastify";
import { TabGuardComp } from "ag-grid-community";
import { BaseURL } from "../../../URL";

// const image = require('../../../assets/imagesCustomer/image.png');

function VendorProfile() {
  const [profileModal, setProfileModal] = useState(false);
  const [vendorDetails, setvendorDetails] = useState();
  const [ShopList, setShopList] = useState([])

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [editUserDetails, setEditUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });



  useEffect(() => {
    setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
  }, []);

  // setEditUserDetails(userDetails);

  const handleCloseModal = () => setProfileModal(false);
  const handleShowModal = () => setProfileModal(true);

  const [editUserDetailsErrors, setEditUserDetailsErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // setEditUserDetails(userDetails);
  const [image, setImage] = useState(userDetails.image);

  const [imageErrors, setTmageErrors] = useState("");

  useEffect(() => {
    if (image !== "") {
      setTmageErrors("");
    }
  }, [image]);

  const handleChange = (e) => {
    console.log("eeeeeeeeeeeeeeee", e);
    setEditUserDetails({
      ...editUserDetails,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.phone]: e.target.value,
    });
  };

  const venderValidation = () => {
    const newErrors = {};
    const { name, email, phone } = editUserDetails;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const nameRegex = /^[a-zA-Z\s]{1,}[\.]{0,1}[a-zA-Z\s]{0,}$/;
    if (name === "" || nameRegex.test(nameRegex)) {
      newErrors.name = "please enter name";
    }
    if (email === "" || !emailRegex.test(email)) {
      newErrors.email = "please enter a valid email address";
    }
    if (phone === "" || !phoneRegex.test(phone)) {
      newErrors.phone = "please enter a valid phone number";
    }
    return newErrors;
  };

  const editUser = async () => {
    const data = await axios
      .put(
        `${BaseURL}/vendor/updateProfile`,
        {
          id: vendorDetails?._id,
          name: editUserDetails?.name ? editUserDetails?.name : vendorDetails?.name,
          email: editUserDetails?.email ? editUserDetails?.email : vendorDetails?.email,
          phoneNumber: editUserDetails?.phone ? editUserDetails?.phone : vendorDetails?.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          localStorage.setItem('vendorDetails', JSON.stringify(response?.data?.vendor))
          toast.success(" Profile Details Updated", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
          });
          window.location.reload()
        } else {
          console.log("else is working");
        }
      }
      ).catch((error) => {
        console.log("error ==>", error);
      })
  }

  const editProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", vendorDetails?._id);
    const headers = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const url = `${BaseURL}/vendor/profile-img`;
    const data = await axios.put(url, formData, headers).catch((error) => {
      console.log("error ==>", error);
      if (error) {
        toast.error("Profile not Updated");
      }
    });
    setEditUserDetails({ ...editUserDetails, image: data.data.data.image });
    // localStorage.setItem('vendorDetails', JSON.stringify(data?.data?.vendor))
    if (data.status === 200) {
      toast.success("Profile Picture Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
    console.log("profile updated 200 ", data.data.data.image);
  };

  // console.log(editUserDetailsErrors, "editUserDetailsErrors");

  const handleSaveChange = () => {
    editUser();
  };


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

  console.log("editUserDetails", editUserDetails);
  console.log("vendorDetails", vendorDetails);

  return (
    <>
      <div>
        <div class="sidebar">
          <SideBar />
        </div>
        <div class="content">
          <div className="container">
            <FirstNavbar />
            <h3 className="headertext">Vendor Profile</h3>
            {vendorDetails?.phoneNumber === "" ? (
              "...loading"
            ) : (
              <div>

                <Card className="p-2 ">
                  <h4 className="headertext fs-4 fw-bold  d-flex">Personal Deatils</h4>

                  <Row className="mt-4">
                    <Col md={3}>
                      <Figure>
                        <Figure.Image
                          width={200}
                          height={200}
                          alt="171x180"
                          src={vendorDetails?.image}
                          className="border border-1 border-dark p-1"
                        />
                      </Figure>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col className="" md={6}>
                          <h5 className="fs-5 fw-bold">Name</h5>
                          <h5 >{vendorDetails?.name}</h5>

                        </Col>
                        <Col className="" md={6} >
                          {/* <h5 >{userDetails.name}</h5> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="m-1" md={6}>
                          <h5 className="fs-5 fw-bold">Phone Number :-</h5>
                        </Col>
                        <Col className="m-1" md={6}>
                          <h5>+91 {vendorDetails?.phoneNumber}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="m-1" md={6}>
                          <h5 className="fs-5 fw-bold">E-mail Id :-</h5>
                        </Col>
                        <Col className="m-1" md={6}>
                          <h5>{vendorDetails?.email}</h5>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2} className=" h-25 w-25">
                      <Button className="w-50" variant="warning" onClick={handleShowModal}>
                        Edit Profile
                      </Button>
                    </Col>
                  </Row>
                  <Row>

                  </Row>

                  <Card className="p-2 mt-5">
                    <h3 className="text1">Available stores</h3>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Store Name</th>
                          <th>Location</th>
                          {/* <th>Phone Number</th>
                      <th>Email</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {ShopList?.map((shop, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{shop?.name}</td>
                            <td>{shop?.address?.city}-{shop?.address?.zip}</td>
                            {/* <td>9878976098</td>
                          <td>manu@gmail.com</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </Card>
              </div>
            )}
          </div>
        </div>
        {/* {console.log(editUserDetails.name)} */}
        <Modal
          show={profileModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <h4 className="headertext text-center">Edit Profile Details:</h4>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    maxLength={50}
                    type="text"
                    placeholder={vendorDetails?.name}
                    size="sm"
                    name="name"
                    value={editUserDetails?.name}
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    pattern="/^[a-zA-Z]*$/"
                    required
                  />
                  <span className="text-danger">
                    {editUserDetailsErrors?.name}
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
                    type="text"
                    placeholder={vendorDetails?.email}
                    size="sm"
                    name="email"
                    value={editUserDetails?.email}
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                  />
                  <span className="text-danger">
                    {editUserDetailsErrors?.email}
                  </span>
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    maxLength={50}
                    type="tele"
                    placeholder={vendorDetails?.phoneNumber}
                    size="sm"
                    name="phone"
                    // value={editUserDetails?.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                  />
                  <span className="text-danger">
                    {editUserDetailsErrors?.phone}
                  </span>
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Row>
                <Figure>
                  <Figure.Image
                    width={100}
                    height={100}
                    alt="171x180"
                    src={editUserDetails.image ? editUserDetails.image : vendorDetails?.image}
                  // onChange={}
                  />
                </Figure>
              </Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Select Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Profile Image"
                    // value={image}
                    className="w-50"
                    pattern="^.+\.(gif|jpe?g|png)$"
                    name="image"
                    onChange={(e) => setImage(e.target.files[[0]])}
                    autoComplete="off"
                  />
                  <span className="text-danger">{imageErrors}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button variant="warning" onClick={editProfileImage}>
                  Update
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal} variant="secondary">
              Cancel
            </Button>
            <Button variant="warning" onClick={handleSaveChange}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default VendorProfile;
