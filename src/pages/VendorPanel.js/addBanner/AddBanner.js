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
import axios from "axios";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const image = require("../../../assets/imagesCustomer/image.png");

function AddBanner() {
  const [jewelleryModal, setJewelleryModal] = useState(false);
  const [coinModal, setCoinModal] = useState(false);

  const [vendorDetails, setvendorDetails] = useState();

  useEffect(() => {
    setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
  }, []);

  const handleCloseModal = () => setJewelleryModal(false);
  const handleShowModal = () => setJewelleryModal(true);

  const [editdata, seteditdata] = useState({})
  const handleCloseModal1 = () => setCoinModal(false);
  const handleShowModal1 = (item) => { setCoinModal(true); seteditdata(item) }

  const [banner, setBanner] = useState([]);

  const [allList, setAllList] = useState([]);
  const [allBanner, setAllBanner] = useState([]);
  const [ShopList, setShopList] = useState([])
  const [SeletedShop1, setSeletedShop1] = useState(ShopList[0]?._id)
  const [SeletedShop, setSeletedShop] = useState()


  useEffect(() => {
    if (ShopList?.length > 0) {
      setSeletedShop1(ShopList[0]?._id)
    }
  }, [ShopList])

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
    getBannerData();
  }, [SeletedShop1]);



  useEffect(() => {
    if (vendorDetails) {
      getShopList();
    }
  }, [vendorDetails]);


  const getBannerData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:3001/api/Banner/getAllBanner`
      );
      console.log("asfsdf", data.data.Banner);
      setAllBanner(data.data.Banner?.filter((item) => item?.deleted == false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (SeletedShop1) {
      console.log("filter", SeletedShop1, vendorDetails?._id);
      setAllList(allBanner?.filter((item) => item?.VendorID?._id == vendorDetails?._id && item?.StoreID?._id == SeletedShop1));
    }
  }, [SeletedShop1]);



  const countByStatus = (status) =>
    allList.reduce((count, item) => {
      if (item.Status === status) {
        count++;
      }
      return count;
    }, 0);

  const approvedCount = countByStatus("Approved");
  const pendingCount = countByStatus("Pending");
  const BlockedCount = countByStatus("Blocked");

  const [file, setFile] = useState();
  const [file1, setFile1] = useState();

  const handelOnChange = (e) => {
    setFile(e);
  };

  const handleSubmitBanner = async () => {
    if (!SeletedShop) {
      alert("please select shop")
    } else if (!file) {
      alert("please select Image")
    } else {
      const formData = new FormData();
      formData.append("Image", file);
      formData.append("StoreID", SeletedShop);
      formData.append("VendorID", vendorDetails?._id);
      const data = await axios.post(
        `http://localhost:3001/api/Banner/createBanner`,
        formData,
        {
          headers: { "x-access-Token": localStorage.getItem("accessToken") },
        }
      );
      console.log(data);
      if (data.status === 200) {
        alert("banner added successfully")
        handleCloseModal()
        getBannerData();
      }
    }
  };


  const editBanner = async () => {
    if (!file1) {
      alert("please select Image")
    } else {
      const formData = new FormData();
      formData.append("Image", file1);
      formData.append("Status", editdata?.Status);
      formData.append("BannerID", editdata?._id);
      const data = await axios.patch(
        `http://localhost:3001/api/Banner/editBanner`,
        formData,
        {
          headers: { "x-access-Token": localStorage.getItem("accessToken") },
        }
      );
      console.log(data);
      if (data.status === 200) {
        alert("banner updated successfully")
        handleCloseModal1()
        getBannerData();
      }
    }
  };


  const deleteBanner = async (id) => {
    console.log("id", id);

    if (window.confirm("Are you sure you want to delete...?")) {
      const data = await axios
        .patch(`http://localhost:3001/api/Banner/deleteBanner/${id}`, {}, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .catch((error) => {
          console.log("error ==>", error);
        });
      console.log("store updated  ===> ", data);
      if (data.status === 200) {
        toast.success("Scheme deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        getBannerData()
      }
    }
  };

  console.log("allList", allList);
  // console.log("vendorDetails", vendorDetails);
  console.log("ShopList", ShopList);


  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className="headertext">Banner </h3>
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
                  {/* <h3 className="headertext">Manage Banner</h3> */}
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Button variant="warning" onClick={handleShowModal}>
                    Upload new Banner
                  </Button>
                </Col>
              </Row>
              <hr />
              <Card className="p-2">

                <div className="Bannercontent-flex">
                  <h3 className="text1">Approved Banner</h3>
                  <p>
                    <b> Total Count :- {approvedCount} </b>{" "}
                  </p>
                </div>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Status</th>
                      <th>Image</th>
                      {/* <th>Edit</th> */}
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allList
                      ?.filter((ele) => ele.Status == "Approved")
                      ?.map((e, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{e?.Status}</td>
                          <td>
                            <img src={e?.Image} className="w-25" />
                          </td>
                          {/* <td>
                            <FontAwesomeIcon
                              onClick={() => handleShowModal1(e)}
                              icon={faEdit}
                              className="editIcon"
                            />
                          </td> */}
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="editIcon"
                              style={{ color: "red" }}
                              value="edit"
                              onClick={() => {
                                deleteBanner(e?._id);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Card>
              <hr />
              <Card className="p-2">
                <div className="Bannercontent-flex">
                  <h3 className="text1">Pending Banner</h3>
                  <p>
                    <b> Total Count(pending) :- {pendingCount} </b>{" "}
                  </p>
                  <p>
                    <b> Total Count(Blocked) :- {BlockedCount} </b>{" "}
                  </p>

                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Status</th>
                      <th> Image</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allList?.filter((ele) => ele.Status === "Pending" || ele.Status === 'Blocked')
                      ?.map((e, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{e?.Status}</td>
                          <td>
                            <img src={e?.Image} className="w-25" />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              onClick={() => handleShowModal1(e)}
                              icon={faEdit}
                              className="editIcon"
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="editIcon"
                              style={{ color: "red" }}
                              value="edit"
                              onClick={() => {
                                deleteBanner(e?._id);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
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
        <h4 className="headertext text-center mt-3">Upload Banner Image</h4>
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
                <Form.Label className="mt-5">Banner Image</Form.Label>
                <Form.Control
                  name="file"
                  type="file"
                  className="mb-3"
                  onChange={(e) => handelOnChange(e.target.files[0])}
                />

              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={handleSubmitBanner}>
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
        <h4 className="headertext text-center">Edit Banner :</h4>
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
                  <option>{editdata?.StoreID?.name}</option>
                </Form.Select>
                <Form.Label className="mt-5">Banner Image</Form.Label>
                <Form.Control
                  name="file"
                  type="file"
                  className="mb-3"
                  onChange={(e) => setFile1(e.target.files[0])}
                />

              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal1} variant="secondary">
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              editBanner();
            }}
          >
            Save
          </Button>


        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddBanner;
