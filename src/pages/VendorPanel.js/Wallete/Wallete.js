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


function Wallete() {
    const navigate = useNavigate();
    const [CustomerList, setCustomerList] = useState([]);
    const [ShopList, setShopList] = useState([])
    const [selectedShop, setselectedShop] = useState()
    const [InvestmentData, setInvestmentData] = useState([]);
    const [filterData, setfilterData] = useState([])
    const [search, setsearch] = useState("")
    const [Wallete, setWallete] = useState([])
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
            getWallete()
        }
    }, [selectedShop])


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

    const getWallete = async () => {
        console.log("functioncalled");

        axios.get(`${BaseURL}/user/Wallete/StoresWallete/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                setWallete(response.data.Wallete);
                setfilterData(response.data.Wallete); // Fixed typo
                const amt = response?.data?.Wallete?.reduce((a, b) => a + parseInt(b.Amount), 0)
            } else {
                console.error("Error fetching data:", response);
                setWallete([]);
                setfilterData([]); // Also reset filterData
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setWallete([]);
            setfilterData([]); // Also reset filterData
        });
    };

    // Fixed search effect - now resets to full list when search is empty
    useEffect(() => {
        searchCustomers(search)
    }, [search, Wallete])

    const searchCustomers = (searchText) => {
        if (!searchText || searchText.trim() === "") {
            setfilterData(Wallete); // Reset to full list when search is empty
            return;
        }

        const filteredData = Wallete?.filter((item) => {
            const searchLower = searchText.toLowerCase().trim();

            // Search in customer name
            const nameMatch = item?.userId?.name?.toLowerCase().includes(searchLower);

            // Search in PaymentID
            const paymentMatch = item?.PaymentID?.toLowerCase().includes(searchLower);

            // Search in date (supports multiple date formats)
            const dateMatch = item?.date?.toLowerCase().includes(searchLower);

            // Search in amount (convert to string)
            const amountMatch = item?.Amount?.toString().includes(searchText);

            // Search in gold rate (convert to string)
            const goldRateMatch = item?.goldRate?.toString().includes(searchText);

            return nameMatch || paymentMatch || dateMatch || amountMatch || goldRateMatch;
        });

        setfilterData(filteredData);
    }

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
                                                placeholder="Search by Name, Date, Payment ID, Amount..."
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
                                            <th>Amount</th>
                                            <th>Gold Rate</th>
                                            <th>PaymentID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterData?.length > 0 ? (
                                            filterData.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item?.date}</td>
                                                    <td>{item?.userId?.name}</td>
                                                    <td>{item?.Amount}</td>
                                                    <td>{item?.goldRate}</td>
                                                    <td>{item?.PaymentID}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    {search ? "No results found" : "No data available"}
                                                </td>
                                            </tr>
                                        )}
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

export default Wallete;