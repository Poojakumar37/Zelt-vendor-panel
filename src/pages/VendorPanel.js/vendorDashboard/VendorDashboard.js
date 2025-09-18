import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Button, Table, Form } from "react-bootstrap";
import Plot from "react-plotly.js";
import axios from "axios";
import Stats from "../storeStats/Stats";
import moment from "moment";

function VendorDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [ShopList, setShopList] = useState([])
  const [selectedShop, setselectedShop] = useState()
  const [InvestmentData, setInvestmentData] = useState([])
  const [liveRate, setLiveRate] = useState(5000);
  const [CustomerList, setCustomerList] = useState([]);

  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );

  useEffect(() => {
    if (ShopList?.length > 0) {
      setselectedShop(ShopList[0]?._id)
    }
  }, [ShopList])



  const getShopList = async () => {
    try {
      const response = await axios.get(
        "https://api.thezelt.in/api/Stores/getAllStores",
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


  const handleDashboardClick = () => {
    setActiveView("dashboard");
  };

  const handleStatsClick = () => {
    setActiveView("statistics");
  };


  const investData = () => {
    axios.get(`https://api.thezelt.in/api/user/getSchemeOrderStoresID/${selectedShop}`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log("API Response:", response.data.SchemeOrder);  // Check the API data
        setInvestmentData(response.data.SchemeOrder);
      } else {
        console.error("Error fetching data:", response);
        setInvestmentData([]);  // Ensure state updates
      }
    }).catch((error) => {
      console.error("Axios Error:", error);
      setInvestmentData([]);
    });
  };


  useEffect(() => {
    if (selectedShop) {
      investData()
    }
  }, [selectedShop])

  useEffect(() => {
    getShopList()
  }, []);



  // const totalInvestmentAmountToday = useMemo(() => {
  //   if (!InvestmentData?.length) return 0;

  //   const todayFormatted = moment().format("DD-MM-YYYY");

  //   return InvestmentData.reduce((total, item) => {
  //     if (!item?.Investment?.length) return total;

  //     const todayInvestments = item.Investment.filter(investment => {
  //       if (!investment?.InvestmentDate) return false;
  //       return moment(investment.InvestmentDate).format("DD-MM-YYYY") === todayFormatted;
  //     });

  //     const todayTotal = todayInvestments.reduce((sum, investment) => sum + (investment?.Amount || 0), 0);

  //     return total + todayTotal;
  //   }, 0);
  // }, [InvestmentData]);


  const todayInvestmentStats = useMemo(() => {
    if (!InvestmentData?.length) {
      return {
        totalAmount: 0,
        totalGold: 0,
      };
    }

    const todayFormatted = moment().format("DD-MM-YYYY");

    return InvestmentData.reduce(
      (totals, item) => {
        if (!item?.Investment?.length) return totals;

        const todayInvestments = item.Investment.filter(investment => {
          if (!investment?.InvestmentDate) return false;
          return moment(investment.InvestmentDate).format("DD-MM-YYYY") === todayFormatted;
        });

        todayInvestments.forEach(investment => {
          const amount = investment?.Amount || 0;
          const rate = investment?.GoldRateondate || 0;
          const gold = rate > 0 ? amount / rate : 0;

          totals.totalAmount += amount;
          totals.totalGold += gold;
        });

        return totals;
      },
      { totalAmount: 0, totalGold: 0 }
    );
  }, [InvestmentData]);



  useEffect(() => {
    if (InvestmentData) {
      setCustomerList(removeDuplicateUsers())
    }
  }, [InvestmentData])

  const removeDuplicateUsers = () => {
    // Create a Map to track unique UserIDs
    const uniqueUsersMap = new Map();

    // Iterate through each item in the array
    InvestmentData.forEach((item) => {
      const userID = item?.UserID?._id; // Assuming UserID has an _id field

      // If the UserID is not already in the Map, add it
      if (!uniqueUsersMap.has(userID)) {
        uniqueUsersMap.set(userID, item);
      }
    });

    // Return an array of unique users
    return Array.from(uniqueUsersMap.values());
  };

  // console.log("Total Investment Amount Today:", totalInvestmentAmountToday);

  console.log("InvestmentData", InvestmentData);
  // console.log("selectedShop", selectedShop);
  // console.log("ShopList", ShopList);

  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">

        <div className="container">
          <div className="d-flex mt-4 justify-content-between">
            <div>
              <Button
                variant={activeView === "dashboard" ? "success" : "secondary"}
                onClick={handleDashboardClick}
                className={`${activeView === "dashboard" ? "bg-success" : "bg-secondary"
                  } text-White mt-2`}>
                Dashboard
              </Button>{" "}
              <Button variant={activeView === "statistics" ? "bg-success" : "primary"}
                onClick={handleStatsClick}
                className={`${activeView === "statistics" ? "bg-success" : "bg-secondary"
                  } text-white mt-2`}
              >
                Statistics
              </Button>
            </div>

            <div className="">
              <FirstNavbar />
            </div>
          </div>

          {/* Create buttons to switch between views */}

          <>
            {activeView === "dashboard" ? (
              <>
                <h3 className="headertext fw-bold mt-4">Dashboard</h3>
                <div>
                  <Card className="p-2">
                    {/* <h3 className="headertext">{userDetails.name}</h3> */}
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
                    <Card className="p-2">
                      <h3 className="text1">Statistics</h3>
                      <Row>
                        {/* <Col md={3} className="">
                          <Card className="p-2 background">
                            <div className="centerAlign">
                              <h3>Jewellery Sold</h3>
                              <div
                                style={{
                                  borderRadius: 50,
                                  height: 100,
                                  width: 100,
                                  border: "3px solid #BE783B",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <h1 style={{}}>
                                  {dashboardData.productsSold
                                    ? dashboardData.productsSold
                                    : 0}
                                </h1>
                              </div>
                            </div>
                          </Card>
                        </Col> */}
                        <Col md={3} className=" ">
                          <Card className="p-2 background">
                            <h3>Schemes Sold</h3>
                            <h6>Total</h6>
                            <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <h5 style={{}}>
                                {InvestmentData?.length > 0
                                  ? InvestmentData?.length
                                  : 0}
                              </h5>
                            </div>
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3>Total Amount</h3>
                            <h6>{moment().format("DD-MM-YYYY")}</h6>
                            <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                              <h5>
                                {todayInvestmentStats?.totalAmount}
                              </h5>
                            </div>
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3>Total Gold</h3>
                            <h6>{moment().format("DD-MM-YYYY")}</h6>
                            <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                              <h5>
                                {(todayInvestmentStats?.totalGold)?.toFixed(2)}/gm
                              </h5>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                      <hr />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="text1">Customers</h3>
                        <button style={{ background: "transparent", border: "none" }} onClick={() => window.location.assign("CustomersList")}>
                          <h6 className="text1">View All</h6>
                        </button>
                      </div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CustomerList?.length > 0 &&
                            CustomerList?.slice(0, 5)?.map((user, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user?.UserID?.name}</td>
                                <td>{user?.UserID?.phone}</td>
                                <td>{user?.UserID?.email}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Card>
                </div>
              </>

            ) : (
              <>
                {/* <h3 className="headertext">statistics</h3> */}
                <Stats />
              </>
            )}
          </>

        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;