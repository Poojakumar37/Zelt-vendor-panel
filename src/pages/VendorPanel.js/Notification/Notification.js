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

function Notification() {
    const [jewelleryModal, setJewelleryModal] = useState(false);
    const [vendorDetails, setvendorDetails] = useState();
    const [allList, setAllList] = useState([]);
    const [allNotification, setAllNotification] = useState([]);
    const [ShopList, setShopList] = useState([])
    const [SeletedShop1, setSeletedShop1] = useState(ShopList[0]?._id)
    const [SeletedShop, setSeletedShop] = useState()
    const [Text, setText] = useState("")

    useEffect(() => {
        setvendorDetails(JSON.parse(localStorage.getItem("vendorDetails")))
    }, []);

    const handleCloseModal = () => setJewelleryModal(false);
    const handleShowModal = () => setJewelleryModal(true);





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
        getNotificationData();
    }, [SeletedShop1]);



    useEffect(() => {
        if (vendorDetails) {
            getShopList();
        }
    }, [vendorDetails]);


    const getNotificationData = async () => {
        try {
            const data = await axios.get(
                `http://localhost:3001/api/Vendor/getAllNotification`
            );
            console.log("asfsdf", data.data.Notification);
            setAllNotification(data.data.Notification?.filter((item) => item?.deleted == false));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (SeletedShop1) {
            console.log("filter", SeletedShop1, vendorDetails?._id);
            setAllList(allNotification?.filter((item) => item?.VendorID?._id == vendorDetails?._id && item?.StoreID?._id == SeletedShop1));
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


    const handleSubmitNotification = async () => {
        if (!SeletedShop) {
            alert("please select shop")
        } else if (!Text) {
            alert("Please enter notification")
        } else {
            const data = await axios.post(
                `http://localhost:3001/api/Vendor/createNotification`,
                {
                    StoreID: SeletedShop,
                    VendorID: vendorDetails?._id,
                    Text: Text
                },
                {
                    headers: { "x-access-token": localStorage.getItem("accessToken") },
                }
            );
            console.log(data);
            if (data.status === 200) {
                getNotificationData();
                toast.success("Notification added successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
                window.location.reload()
            }
        }
    };



    const deleteNotification = async (id) => {
        console.log("id", id, localStorage.getItem("accessToken"));

        if (window.confirm("Are you sure you want to delete...?")) {
            const data = await axios
                .patch(`http://localhost:3001/api/Vendor/deleteNotification/${id}`,
                    {},
                    {
                        headers: { "x-access-token": localStorage.getItem("accessToken") },
                    }

                )
                .catch((error) => {
                    console.log("error ==>", error);
                });
            console.log("store updated  ===> ", data);
            if (data.status === 200) {
                toast.success("Notification deleted successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "light",
                });
                window.location.reload()
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
                    <h3 className="headertext">Notification </h3>
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
                                    {/* <h3 className="headertext">Manage Notification</h3> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Button variant="warning" onClick={handleShowModal}>
                                        Upload new Notification
                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                            <Card className="p-2">

                                <div className="Notificationcontent-flex">
                                    <h3 className="text1">Approved Notification</h3>
                                    <p>
                                        <b> Total Count :- {approvedCount} </b>{" "}
                                    </p>
                                </div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Status</th>
                                            <th>Notification</th>
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
                                                        {e?.Text}
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
                                                                deleteNotification(e?._id);
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
                                <div className="Notificationcontent-flex">
                                    <h3 className="text1">Pending Notification</h3>
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
                                            <th>Notification</th>
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
                                                        {e?.Text}
                                                    </td>
                                                    <td>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="editIcon"
                                                            style={{ color: "red" }}
                                                            value="edit"
                                                            onClick={() => {
                                                                deleteNotification(e?._id);
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
                <h4 className="headertext text-center mt-3">Add Notification</h4>
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
                                <Form.Label className="mt-5">Notification</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Notification"
                                    className="mb-3"
                                    onChange={(e) => setText(e.target.value)}
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
                    <Button variant="warning" onClick={handleSubmitNotification}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Notification;
