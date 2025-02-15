import React, { useState, useEffect } from "react";
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
import Plot from "react-plotly.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
// const image = require('../../../assets/imagesCustomer/image.png');

function ManageAdmin() {
  const [profileModal, setProfileModal] = useState(false);
  const [addAdminModal, setAdminModal] = useState(false);
  const handleCloseModal = () => setProfileModal(false);
  const handleShowModal = () => setProfileModal(true);
  const [validated, setValidated] = useState(false);
  const handleCloseAdminModal = () => setAdminModal(false);
  const handleShowAdminModal = () => setAdminModal(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [employeeList, setEmployeeList] = useState([
    {
      name: "",
      email: "",
      phone: "",
      shopId: "",
      role: "",
    },
  ]);
  const [editAdminDetails, setEditAdminDetails] = useState({
    name: "",
    email: "",
    phone: "",
    shopId: "",
    role: "admin",
  });
  const [image, setImage] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const getAdminData = async () => {
    const data = await axios
      .get(
        `https://zelt-auth.moshimoshi.cloud/getEmployees?shopId=` +
          localStorage.getItem("shopId"),
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
      .catch((error) => {
        console.log("error ==>", error);
      });
    if (data.status == 200) setEmployeeList(data.data.data.employees);
    console.log("admin details  ===> ", data.status);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    navigate("/vendorAdmin");
    handleCloseAdminModal();
  };

  const removeAdmin = async () => {
    console.log("EMP ID---->", employeeId);
    const data = await axios
      .delete(
        `https://zelt-auth.moshimoshi.cloud/removeEmployee?shopId=` +
          localStorage.getItem("shopId") +
          "&employeeId=" +
          employeeId,
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
      handleCloseAdminModal();
      await getAdminData();
    }
    console.log("admin details  ===> ", data.status);
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };
  const handleChange = ({ target: { name, value } }) => {
    console.log("HANDLE CHANGE--->", name, value);
    setEditAdminDetails({ ...editAdminDetails, [name]: value });
  };

  const handleValidation = () => {
    if (!employeeList.phone("[0-9]{10}")) {
      alert("Please provide valid phone number");
    }
  };
  const handleClose = () => setShow(false);
  useEffect(() => {
    getAdminData();
  }, []);
  const addAdmin = async () => {
    // const formData = new FormData();
    // formData.append('name', editAdminDetails.name);
    // formData.append('email', editAdminDetails.email);
    // formData.append('phone', editAdminDetails.phone);
    // formData.append('role', editAdminDetails.role);
    // formData.append('image', image);
    let body = {
      name: editAdminDetails.name,
      email: editAdminDetails.email,
      phone: editAdminDetails.phone,
      role: editAdminDetails.role,
      type: "admin",
      shopId: localStorage.getItem("shopId"),
    };

    console.log("body DATA---->", body);

    const data = await axios
      .post(
        `https://zelt-auth.moshimoshi.cloud/createEmployee?shopId=` +
          localStorage.getItem("shopId"),
        body,
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
      .catch((error) => {
        toast.error("error:" + error);
        console.log("error ==>", error);
      });
    if (data.status == 200) {
      toast.success("Admin Added Successfully");
      handleCloseModal();
      await getAdminData();
    }

    console.log("admin added ===>", data);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        delay={500}
        limit={1}
      />
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />

          <h3 className="headertext">Employees</h3>
          <InputGroup className="w-25">
            <InputGroup.Text>Select Shop</InputGroup.Text>
            <Form.Select
              aria-label="Select Shops"
              size={"sm"}
              onChange={(e) => {
                localStorage.setItem("shopId", e.target.value);
                getAdminData();
              }}
            >
              {/* <option >Select Store</option> */}
              {localStorage.getItem("userDetails") &&
                JSON.parse(
                  localStorage.getItem("userDetails")
                ).data?.shops?.map((shop) => (
                  <option value={shop._id}>{shop.name}</option>
                ))}
            </Form.Select>
          </InputGroup>
          <div>
            <Card className="p-2">
              <Row>
                <Col md={3}>
                  <h3 className="headertext">Manage Admin</h3>
                </Col>
                <Col md={3}>
                  <Button variant="warning" onClick={handleShowAdminModal}>
                    Add new Admin
                  </Button>
                </Col>
              </Row>

              <Card className="p-2">
                {/* <hr /> */}
                <h3 className="text1">Available Employees:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Employee Name</th>
                      <th>Employee Number</th>
                      <th>Employee Type</th>
                      <th>Email</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.length ? (
                      employeeList.map((employee, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{employee.name}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.type}</td>
                          <td>{employee.email}</td>
                          <td>
                            <FontAwesomeIcon
                              onClick={() => {
                                handleShowModal();
                                setEmployeeId(employee._id);
                              }}
                              icon={faTrash}
                              className="editIcon"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>No Employees for this shop</tr>
                    )}
                  </tbody>
                </Table>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        show={profileModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <h4 className="headertext text-center">Confirm remove employee</h4>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="danger" onClick={() => removeAdmin()}>
            Remove Employee
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={addAdminModal}
        onHide={handleCloseAdminModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h4 className="headertext text-center">Add Admin Details:</h4>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="validationCustom03">
                  <Form.Label>Admin Name</Form.Label>
                  <Form.Control
                    maxLength={50}
                    type="text"
                    placeholder="Enter Your Name"
                    size="sm"
                    name="name"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                  <span className="text-danger">{}</span>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Email Id</Form.Label>
                  <Form.Control
                    maxLength={50}
                    type="email"
                    placeholder="Enter Email Id"
                    size="sm"
                    name="email"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    required
                  />
                  <span className="text-danger">{}</span>
                </Form.Group>
              </Col>
              {/* <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Store Name"
                  size="sm"
                  name='storeName'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                />
                <span className="text-danger">{ }</span>
              </Form.Group>
            </Col> */}
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    maxLength={50}
                    minLength={10}
                    type="number"
                    placeholder="Enter Phone Number"
                    size="sm"
                    name="phone"
                    value={editAdminDetails.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                  />

                  <span className="text-danger">{editAdminDetails.error}</span>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Access Type</Form.Label>

                  <Form.Select aria-label="">
                    <option>Type of Employee</option>
                    <option value="1">Admin</option>
                    <option value="2">Marketing</option>
                    <option value="3">Manager</option>
                  </Form.Select>

                  <span className="text-danger">{}</span>
                </Form.Group>
              </Col>
            </Row>
            {/* <Row> */}

            {/* </Row>
          <Row> */}
            {/* <Col>
              <Form.Group className="mb-3">
                <Form.Label>Select Admin Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Admin Image"
                  className="w-50"
                  name="image"
                  // value={}
                  onChange={e => setImage(e.target.files[[0]])}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

          </Row> */}

            {/* <Row>
            <Col md={6}>
              <Button variant="warning">Update</Button>
            </Col>

          </Row> */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseAdminModal} variant="secondary">
              Cancel
            </Button>
            <Link to="/vendorAdmin">
              <Button
                variant="warning"
                onClick={() => addAdmin(editAdminDetails)}
              >
                Add Admin
              </Button>
            </Link>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageAdmin;
