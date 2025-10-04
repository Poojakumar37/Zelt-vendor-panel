import React, { useState, useEffect } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import AuthServices from "../../authServices/AuthServices";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { BaseURL } from "../../../URL";

const image = require("../../../assets/imagesCustomer/image.png");

function CustomerWallete() {
    const navigate = useNavigate();
    const location = useLocation()
    const { Customer, selectedShop } = location.state;
    const [Wallete, setWallete] = useState([]);


    useEffect(() => {
        if (Customer && selectedShop) {
            getWallete()
        }
    }, [Customer, selectedShop])



    const getWallete = async () => {
        console.log("functioncalled");

        axios.get(`${BaseURL}/user/Wallete/${Customer?.UserID?._id}/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                setWallete(response.data.Wallete);
                const amt = response?.data?.Wallete?.reduce((a, b) => a + parseInt(b.Amount), 0)
            } else {
                console.error("Error fetching data:", response);
                setWallete([]);  // Ensure state updates
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setWallete([]);
        });
    };

    console.log("Wallete", selectedShop);

    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className="headertext">Customers Wallete</h3>
                    <div>
                        <Card className="p-2">
                            <Row>
                                <Col md={4}>

                                </Col>
                            </Row>
                            <Row>
                                <h3 className="text1">{Customer?.UserID?.name}</h3>
                            </Row>
                            <hr />
                            <Card className="p-2">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Gold Rate</th>
                                            <th>PaymentID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Wallete?.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item?.date}</td>
                                                <td> {item?.Amount}</td>
                                                <td>{item?.goldRate} </td>
                                                <td> {item?.PaymentID}</td>
                                            </tr>
                                        ))}
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

export default CustomerWallete;
