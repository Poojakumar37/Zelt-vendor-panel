import React, { useState, useEffect } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseURL } from "../../../URL";


function CustomersList() {
    const navigate = useNavigate();
    const [CustomerList, setCustomerList] = useState([]);
    const [ShopList, setShopList] = useState([])
    const [selectedShop, setselectedShop] = useState()
    const [InvestmentData, setInvestmentData] = useState([]);
    const [filterData, setfilterData] = useState([])
    const [search, setsearch] = useState()
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



    useEffect(() => {
        if (InvestmentData) {
            setCustomerList(removeDuplicateUsers())
        }
    }, [InvestmentData])


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
                setShopList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id == vendorDetails?._id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const investData = () => {
        axios.get(`${BaseURL}/user/getUserAsperStoreId/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("API Response:", response.data.User);  // Check the API data
                setCustomerList(response.data.User);
            } else {
                console.error("Error fetching data:", response);
                setCustomerList([]);  // Ensure state updates
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setInvestmentData([]);
        });
    };


    const removeDuplicateUsers = () => {
        // Create a Map to track unique UserIDs
        const uniqueUsersMap = new Map();

        // Iterate through each item in the array
        InvestmentData.forEach((item) => {
            const userID = item.UserID._id; // Assuming UserID has an _id field

            // If the UserID is not already in the Map, add it
            if (!uniqueUsersMap.has(userID)) {
                uniqueUsersMap.set(userID, item);
            }
        });

        // Return an array of unique users
        return Array.from(uniqueUsersMap.values());
    };


    useEffect(() => {
        if (search) {
            searchCustomers(search)
        }
    }, [search])

    const searchCustomers = (searchText) => {
        if (!searchText) return CustomerList; // If no search text, return all customers

        const filteredData = CustomerList.filter(({ UserID }) => {
            const searchLower = searchText.toLowerCase();
            return (
                UserID.name?.toLowerCase().includes(searchLower) ||
                UserID.phone?.includes(searchText) || // No need for `toLowerCase()` for numbers
                UserID.email?.toLowerCase().includes(searchLower)
            );
        });
        setfilterData(filteredData)
    }

    console.log("InvestmentData", InvestmentData);
    console.log("selectedShop", selectedShop);

    console.log("CustomerList", CustomerList);


    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className="headertext">Customers</h3>
                    <div>
                        <Card className="p-2">
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
                                    <Col md={6}> <h3 className="text1">Customers List</h3></Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search"
                                                size="sm"
                                                name="Subtitle"
                                                onChange={(e) => setsearch(e.target.value)}
                                                autoComplete="off"
                                                className="mb-3"
                                            // value={schemeForm?.Subtitle}
                                            />
                                        </Form.Group>
                                    </Col></Row>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Customers Name</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                            <th>Scheme</th>
                                            <th>Wallete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {search ? filterData?.map((Customer, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{Customer?.UserID?.name}</td>
                                                <td>{Customer?.UserID?.phone}</td>
                                                <td> {Customer?.UserID?.email}</td>
                                                <td>
                                                    <Link to="/CustomersScheme" state={{ Customer: Customer }}>
                                                        <FontAwesomeIcon

                                                            icon={faEye}
                                                            className="editIcon"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to="/CustomerWallete" state={{ Customer: Customer, selectedShop: selectedShop }}>
                                                        <FontAwesomeIcon

                                                            icon={faEye}
                                                            className="editIcon"
                                                        />
                                                    </Link>
                                                </td>

                                            </tr>
                                        )) :
                                            CustomerList?.map((Customer, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{Customer?.name}</td>
                                                    <td>{Customer?.phone}</td>
                                                    <td> {Customer?.email}</td>
                                                    <td>
                                                        <Link to="/CustomersScheme" state={{ Customer: Customer }}>
                                                            <FontAwesomeIcon

                                                                icon={faEye}
                                                                className="editIcon"
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to="/CustomerWallete" state={{ Customer: Customer, selectedShop: selectedShop }}>
                                                            <FontAwesomeIcon

                                                                icon={faEye}
                                                                className="editIcon"
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>))
                                        }
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CustomersList;
