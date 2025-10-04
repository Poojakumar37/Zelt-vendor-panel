import React, { useEffect, useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { BaseURL } from '../../../URL'

const image = require('../../../assets/imagesCustomer/image.png');

function SchemesSold() {
    const [stats, setStats] = useState('');

    const navigate = useNavigate();

    const [SchemesSold, setSchemesSold] = useState([])
    const [Scheme, setScheme] = useState([])
    const [ShopList, setShopList] = useState([])
    const [selectedShop, setselectedShop] = useState()
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
            getAllScheme()
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

    const getAllScheme = () => {
        axios.get(`${BaseURL}/Scheme/getAllScheme`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("API Response:", response.data.Scheme);  // Check the API data
                setScheme(response.data.Scheme?.filter((item) => item?.StoreID?._id === selectedShop));
            } else {
                console.error("Error fetching data:", response);
                setScheme([]);  // Ensure state updates
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setScheme([]);
        });
    };


    const investData = () => {
        axios.get(`${BaseURL}/user/getSchemeOrderStoresID/${selectedShop}`, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("API Response:", response.data.SchemeOrder);  // Check the API data
                setSchemesSold(response.data.SchemeOrder);
            } else {
                console.error("Error fetching data:", response);
                setSchemesSold([]);  // Ensure state updates
            }
        }).catch((error) => {
            console.error("Axios Error:", error);
            setSchemesSold([]);
        });
    };


    console.log("SchemesSold", SchemesSold);
    console.log("ShopList", ShopList);
    console.log("Scheme", Scheme);


    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Schemes Sold</h3>
                    <div>
                        <Card className='p-2'>
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
                                        defaultValue={localStorage.getItem("shopId")} // Set the default value here
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
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    Scheme && Scheme?.map((s, i) => {
                                        const count = SchemesSold?.filter((item) => item?.SchemeID?._id === s?._id)
                                        return (
                                            <div
                                                // onClick={() => navigate('/Schemes')}
                                                className='background cursor fa-mouse-pointer' style={{ width: "22%", height: 200, border: '1px solid', margin: 10, borderRadius: 20, padding: 20 }} key={i}>
                                                <h6>{s.Schemename} {s.Schemename === "VINAYAKA's GOLD JAR" ? "" : `(${s.duration.customerTime} + ${s.duration.vendorTime})`}</h6>
                                                <div style={{ borderRadius: 50, height: 100, width: 100, border: '2px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                    <h1 style={{}}>
                                                        {count?.length}
                                                    </h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr />

                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SchemesSold